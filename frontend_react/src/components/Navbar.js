import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {isLoggedIn, logout} = useAuth();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-gray-400 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          Logo
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/createblog" className="hover:text-gray-300">Add Blog</Link>
          </div>
          <div className="relative">
            <button onClick={toggleMenu} className="focus:outline-none md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 md:hidden">
                <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</Link>
                <Link to="/createblog" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Add Blog</Link>

                <div className="border-t my-2"></div>
                
                {isLoggedIn?
                <div>
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
                    <button onClick={logout} className="px-4 hover:text-gray-400">Logout</button>
                </div>
                : 
                    <Link to="/signin" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">SignIn</Link>
                    }
              </div>
            )}
          </div>
          <div className="relative hidden md:block">
          {!isLoggedIn ?
            <div className="hidden md:flex space-x-4">
                <Link to="/signin" className="hover:text-gray-300">SignIn</Link>
            </div>
            :
            <>
                <button onClick={toggleProfileMenu} className="focus:outline-none flex items-center space-x-2">
                <img src="https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" className="rounded-full w-10 h-10"/>
                </button>
            
                
                {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</ Link>
                    <button onClick={logout} className="px-4 hover:text-gray-400">Logout</button>
                </div>
                )} 
            </>
            }

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
