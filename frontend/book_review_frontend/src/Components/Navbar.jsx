import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-900 text-lime-300 border-b-2 border-lime-300 p-4 sm:p-6 md:p-6 lg:p-4 sticky top-0 z-50">
      <nav className="flex justify-between items-center">
        <span className="text-2xl font-bold text-orange-300 ml-8 my-2">BookVerse</span>
        <div className="hidden md:flex space-x-10">
          <NavLink to="home" className="hover:text-orange-300">
            Home
          </NavLink>
          <NavLink to="/home/books" className="hover:text-orange-300">
            Books
          </NavLink>
          <NavLink to="userprofile" className="hover:text-orange-300">
            Profile
          </NavLink>
          <NavLink to="logout" className="hover:text-orange-300">
            Logout
          </NavLink>
        </div>
        {/* Hamburger Menu */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-lime-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out backdrop-blur-md bg-opacity-50 shadow-lg z-40 w-64 md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-orange-300 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <ul className="flex flex-col items-start space-y-4 mt-16 p-4">
          <li>
          <NavLink to="home" className="hover:text-orange-300">
            Home
          </NavLink>
          </li>
          <li>
            <NavLink
              to="books"
              onClick={toggleMenu}
              className="hover:text-orange-300"
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="userprofile"
              onClick={toggleMenu}
              className="hover:text-orange-300"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="logout"
              onClick={toggleMenu}
              className="hover:text-orange-300"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
