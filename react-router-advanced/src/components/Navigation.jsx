import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ isAuthenticated }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            React Router Advanced
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${isActive('/about')}`}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className={`px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${isActive('/blog')}`}
            >
              Blog
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/profile" 
                className={`px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${isActive('/profile')}`}
              >
                Profile
              </Link>
            ) : (
              <Link 
                to="/login" 
                className={`px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${isActive('/login')}`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;