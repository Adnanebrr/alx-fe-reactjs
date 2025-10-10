import React from 'react';
import { Link } from 'react-router-dom';

// Mock blog posts data
const blogPosts = [
  { id: 1, title: 'Getting Started with React Router', excerpt: 'Learn the basics of routing in React applications...' },
  { id: 2, title: 'Advanced Routing Patterns', excerpt: 'Explore nested routes, protected routes, and more...' },
  { id: 3, title: 'Dynamic Routing in Depth', excerpt: 'Master dynamic URL parameters and route matching...' },
  { id: 4, title: 'Authentication and Route Protection', excerpt: 'Implement secure routes with authentication...' },
];

function Blog() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Posts</h1>
      <p className="text-gray-600 mb-6">
        Click on any post to see dynamic routing in action. Each post has a unique URL with its ID.
      </p>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Link to={`/blog/${post.id}`} className="block">
              <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <span className="text-sm text-gray-400">Post ID: {post.id}</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Dynamic Routing Demo:</h3>
        <p className="text-sm text-blue-700">
          Each blog post uses a dynamic route: <code>/blog/:postId</code>. 
          The component extracts the <code>postId</code> from the URL parameters to display the appropriate content.
        </p>
      </div>
    </div>
  );
}

export default Blog;