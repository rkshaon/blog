import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-cols-3 md:grid-rows-[repeat(12,_min-content)] gap-2 p-2">
    <header className="col-span-full">
      <Navbar />
    </header>
    <nav className="md:row-span-[10] md:col-span-1">
      navigation
    </nav>
    <main className="md:row-span-[10] md:col-span-2">
      {children}
    </main>
    <footer className="col-span-full">
      footer
    </footer>
  </div>
);

export default Layout;
