import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-400 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          Logo
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">Blog Details</a>
          </div>
          <div className="relative">
            <button onClick={toggleMenu} className="focus:outline-none md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 md:hidden">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blog Details</a>

                <div className="border-t my-2"></div>
                
                {isLoggedIn?
                <div>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
                </div>
                : 
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</a>
                    }
              </div>
            )}
          </div>
          <div className="relative hidden md:block">
          {!isLoggedIn ?
            <div className="hidden md:flex space-x-4">
                <a href="#" className="hover:text-gray-300">Login</a>
            </div>
            :
            <>
                <button onClick={toggleMenu} className="focus:outline-none flex items-center space-x-2">
                <img src="https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" className="rounded-full w-10 h-10"/>
                </button>
            
                
                {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
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
