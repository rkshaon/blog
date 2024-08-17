import React, {createContext, useContext, useState, useEffect, useCallback} from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const [accessToken, setAccessToken] = useState(cookies.accessToken || '');
    const [refreshToken, setRefreshToken] = useState(cookies.refreshToken || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

    const checkAuth = useCallback(() => {
        setIsLoggedIn(!!accessToken);
      }, [accessToken]);
    
      useEffect(() => {
        checkAuth();
      }, [checkAuth]);
    
      const login = (newAccessToken, newRefreshToken) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setCookie('accessToken', newAccessToken, {path: '/'});
        setCookie('refreshToken', newRefreshToken, {path: '/'});
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        setAccessToken('');
        setRefreshToken('');
        removeCookie('accessToken', { path: '/' });
        removeCookie('refreshToken', { path: '/' });
        setIsLoggedIn(false);
      };

      return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, checkAuth, accessToken, refreshToken}}>
            {children}
        </AuthContext.Provider>
      )

}