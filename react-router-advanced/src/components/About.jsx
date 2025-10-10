import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About This Demo</h1>
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-4">
          This application demonstrates advanced routing techniques in React using React Router.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Features Implemented:</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Basic routing with React Router DOM</li>
          <li>Nested routes for complex layouts</li>
          <li>Protected routes with authentication checks</li>
          <li>Dynamic routing for variable URLs</li>
          <li>Programmatic navigation</li>
          <li>Route parameters and query strings</li>
        </ul>
      </div>
    </div>
  );
}

export default About;