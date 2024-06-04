import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <aside className="p-4 w-full h-full border">
      <h2 className="text-xl font-semibold mb-4">Navigation</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="block px-4 py-2 hover:bg-slate-400 rounded transition duration-300">Home</Link>
        </li>
        <li className="mb-2">
          <Link to="/blog" className="block px-4 py-2 hover:bg-slate-400 rounded transition duration-300">Blog</Link>
        </li>
        {/*<li className="mb-2">
          <Link to="/signin" className="block px-4 py-2 hover:bg-slate-400 rounded transition duration-300">Sign In</Link>
        </li>
        <li className="mb-2">
          <Link to="/signup" className="block px-4 py-2 hover:bg-slate-400 rounded transition duration-300">Sign Up</Link>
        </li>*/}
      </ul>
    </aside>
  );
};

export default LeftSidebar;
