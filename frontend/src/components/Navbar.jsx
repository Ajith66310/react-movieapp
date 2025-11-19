import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/playfair-display/700.css";

import { useUser, UserButton, SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
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
        <ul className="hidden md:flex space-x-8 text-lg font-['Poppins']">
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

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4 font-['Poppins']">
          {!isSignedIn ? (
            /* Login Button when NOT signed in */
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition duration-200"
            >
              Login
            </Link>
          ) : (
            /* Logout + User Avatar when signed in */
            <>
              <SignOutButton>
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition duration-200">
                  Logout
                </button>
              </SignOutButton>

              {/* Clerk User Dropdown Avatar */}
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <ul className="flex flex-col space-y-4 p-6 text-lg font-['Poppins']">
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

            {/* MOBILE Login / Logout */}
            {!isSignedIn ? (
              <li>
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium block text-center transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="flex justify-center">
                <SignOutButton>
                  <button
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium block text-center transition duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </button>
                </SignOutButton>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
