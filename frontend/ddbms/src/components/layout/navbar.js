import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const usr = JSON.parse(localStorage.getItem('user'));
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setUser(usr);
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          MyApp
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${isOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:space-x-6`}
        >
          <Link
            to="/"
            onClick={toggleMenu}
            className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/data"
            onClick={toggleMenu}
            className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-200"
          >
            Data
          </Link>
          <Link
            to="/users"
            onClick={toggleMenu}
            className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-200"
          >
            Users
          </Link>
          {user.admin &&
            < Link
              to="/adminhistory"
              onClick={toggleMenu}
              className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-200"
            >
              Admin History
            </Link>
          }
          <Link
            to="/history"
            onClick={toggleMenu}
            className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-200"
          >
            History
          </Link>
        </div>
      </nav>
    </header >
  );
};

export default Navbar;
