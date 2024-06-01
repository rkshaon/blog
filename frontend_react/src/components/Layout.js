import React from 'react';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-cols-12 md:grid-rows-[repeat(12,_min-content)] gap-2 p-2">
    <header className="col-span-full">
      <Navbar />
    </header>
    <nav className="md:row-span-[10] md:col-span-2">
      <LeftSidebar />
    </nav>
    <main className="md:row-span-[10] md:col-span-10">
      {children}
    </main>
    <footer className="col-span-full">
      <Footer />
    </footer>
  </div>
);

export default Layout;
