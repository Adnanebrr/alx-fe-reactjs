import React from 'react';
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

function Profile() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-700' : 'text-gray-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
      
      {/* Nested Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <Link
            to="/profile"
            end
            className={`py-2 px-1 border-b-2 font-medium text-sm ${isActive('/profile') ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`}
          >
            Profile Details
          </Link>
          <Link
            to="/profile/settings"
            className={`py-2 px-1 border-b-2 font-medium text-sm ${isActive('/profile/settings') ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`}
          >
            Settings
          </Link>
        </nav>
      </div>

      {/* Nested Routes Outlet */}
      <div className="mt-6">
        <Routes>
          <Route path="/" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
        <Outlet />
      </div>

      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">Nested Routes Demo:</h3>
        <p className="text-sm text-purple-700">
          This Profile section uses nested routing. The main profile route (<code>/profile</code>) 
          contains sub-routes for details and settings (<code>/profile/settings</code>).
          Notice how the URL changes while maintaining the main layout.
        </p>
      </div>
    </div>
  );
}

export default Profile;