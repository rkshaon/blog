import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: "Contact us", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const socialLinks = [
    { name: "Facebook", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "LinkedIn", url: "#" }
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
          <ul>
            {quickLinks.map(link => (
              <li key={link.name} className="mb-2">
                <Link to={link.path} className="hover:text-white transition duration-300">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Follow Us</h2>
          <ul>
            {socialLinks.map(link => (
              <li key={link.name} className="mb-2">
                <a href={link.url} className="hover:text-white transition duration-300">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Contact Us</h2>
          <ul>
            <li className="mb-2">
              <a href="mailto:support@yourcompany.com" className="hover:text-white transition duration-300">support@blog.com</a>
            </li>
            <li className="mb-2">
              <a href="tel:+1234567890" className="hover:text-white transition duration-300">+1 234 567 890</a>
            </li>
            <li className="mb-2">
              <p>123 xyz, Dhaka, Bangladesh</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; {currentYear} Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
