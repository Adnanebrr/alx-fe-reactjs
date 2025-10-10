import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            React Router Advanced
          </Link>
          
          <div className="flex items-center space-x-4">
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
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${isActive('/profile')}`}
                >
                  Profile ({user?.username || 'User'})
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              </div>
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