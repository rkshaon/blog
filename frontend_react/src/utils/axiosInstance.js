import axios from 'axios';
import Cookies from 'react-cookies';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/environment';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor: Adds the access token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.load('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles 401 errors and refreshes the token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.load('refreshToken');
      try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/user/token/refresh`, {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          Cookies.save('accessToken', response.data.accessToken, { path: '/' });
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle the error (e.g., redirect to login)
        console.error('Refresh token expired or invalid', refreshError);
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
