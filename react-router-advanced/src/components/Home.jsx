import React from 'react';

function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Advanced Routing Demo</h1>
      <p className="text-gray-600 mb-6">
        This demo showcases advanced React Router features including nested routes, 
        protected routes, and dynamic routing.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Nested Routes</h3>
          <p className="text-sm text-blue-600">
            Profile section with nested routes for details and settings
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Protected Routes</h3>
          <p className="text-sm text-green-600">
            Profile page requires authentication (try accessing it)
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Dynamic Routing</h3>
          <p className="text-sm text-purple-600">
            Blog posts with dynamic URLs based on post ID
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;