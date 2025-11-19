import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/playfair-display/700.css";


import { useUser, UserButton, SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();


  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>

      <nav className="bg-black text-white fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold tracking-wide text-red-600 font-['Playfair Display']"
          >
            KNOIT.AI
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-10 text-lg font-['Poppins']">
            <li>
              <Link
                to="/"
                className="hover:text-red-500 transition duration-200 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/favourite"
                className="hover:text-red-500 transition duration-200 font-medium"
              >
                Favourites
              </Link>
            </li>
          </ul>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn && <UserButton afterSignOutUrl="/" />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isSignedIn && (
              <div className="mr-2 mt-1">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              className="focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-black border-t border-gray-800 shadow-lg">
            <ul className="flex flex-col space-y-4 p-6 text-lg font-['Poppins']">

              <li>
                <Link
                  to="/"
                  className="hover:text-red-500 transition duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favourite"
                  className="hover:text-red-500 transition duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Favourites
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
