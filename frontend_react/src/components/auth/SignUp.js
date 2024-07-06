import React,{useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/environment';

const SignUp = () => {

  const [errors, setErrors] = useState([]);

  //check already logged in 
  const {isLoggedIn,login} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log('Form data submitted:', formData);

    try {
      let signUpinfo = {
        "username": formData.username,
        "email": formData.email,
        "password": formData.password
    }

      const response = await fetch(`${API_BASE_URL}/api/v1/user/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpinfo),
      });
      console.log('response', response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Failed to sign up');
      }

      const data = await response.json();
      console.log('Sign up successful', data);
     
       // Update the state to indicate a successful sign-up
      // Handle successful sign-in (e.g., store token, etc.)
      navigate('/signin');
    } catch (err) {
      console.log('signup error', err);
      setErrors(err.message.split(', '));
    }
  };


  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl text-white font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex space-x-2">
              <div className='flex-1'>
              <label htmlFor="firstName" className="block text-gray-300">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder='first name'
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className='flex-1'>
              <label htmlFor="lastName" className="block text-gray-300">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder='last name'
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              </div>
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder='username'
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='email'
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='password'
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-royalblue text-white font-bold bg-emerald-500 rounded hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            <div className="text-center mt-3">
              <span className='text-white mr-1'>Already have an account?</span>
              <Link to="/signin" className="text-blue-500 hover:underline">
                SignIn Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp