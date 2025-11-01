import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Website Name */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-red-600">
          MovieFlix
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link to="/" className="hover:text-red-500 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favourite"
              className="hover:text-red-500 transition duration-200"
            >
              Favourites
            </Link>
          </li>
        </ul>

        {/* Login Button (Desktop) */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition duration-200"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <ul className="flex flex-col space-y-4 p-6 text-lg">
            <li>
              <Link
                to="/"
                className="hover:text-red-500"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/favourite"
                className="hover:text-red-500"
                onClick={() => setIsOpen(false)}
              >
                Favourites
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium block text-center transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
