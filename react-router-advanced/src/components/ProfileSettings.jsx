import React, { useState } from 'react';

function ProfileSettings() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
      
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Notification Preferences</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700">Email notifications</p>
              <p className="text-sm text-gray-500">Receive updates about your account via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Theme Settings</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.value)}
                className="mr-2"
              />
              Light Theme
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.value)}
                className="mr-2"
              />
              Dark Theme
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="auto"
                checked={theme === 'auto'}
                onChange={(e) => setTheme(e.target.value)}
                className="mr-2"
              />
              System Preference
            </label>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Account Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2">
              Change Password
            </button>
            <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left text-red-600 hover:text-red-800 py-2">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;