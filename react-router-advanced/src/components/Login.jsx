import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock login - in real app, this would be an API call
    if (username && password) {
      alert(`Login successful! You would be redirected to ${from}`);
      // In real app, you would set authentication state here
      navigate(from, { replace: true });
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
      
      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-700">
          <strong>Demo Note:</strong> This is a mock login. Enter any username and password to "login".
          In a real application, this would connect to an authentication API.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter any username"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter any password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Login
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Protected Route Demo:</h3>
        <p className="text-sm text-gray-600">
          After "logging in", you'll be redirected to your originally requested page.
          Try accessing the Profile page first to see the redirect behavior.
        </p>
      </div>
    </div>
  );
}

export default Login;