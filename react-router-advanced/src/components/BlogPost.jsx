import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock blog posts data (same as in Blog.jsx)
const blogPosts = [
  { 
    id: 1, 
    title: 'Getting Started with React Router', 
    content: 'In this comprehensive guide, we explore the fundamentals of React Router and how to set up basic routing in your React applications. Learn about Routes, Route, and Link components.',
    author: 'John Doe',
    date: '2024-01-15'
  },
  { 
    id: 2, 
    title: 'Advanced Routing Patterns', 
    content: 'Take your routing skills to the next level with advanced patterns including nested routes, route guards, and lazy loading. Perfect for building complex enterprise applications.',
    author: 'Jane Smith',
    date: '2024-01-20'
  },
  { 
    id: 3, 
    title: 'Dynamic Routing in Depth', 
    content: 'Master dynamic URL parameters and learn how to handle variable routes effectively. This guide covers useParams hook, route matching, and programmatic navigation.',
    author: 'Mike Johnson',
    date: '2024-01-25'
  },
  { 
    id: 4, 
    title: 'Authentication and Route Protection', 
    content: 'Implement secure authentication flows and protect sensitive routes in your React applications. Learn about ProtectedRoute components and authentication context.',
    author: 'Sarah Wilson',
    date: '2024-02-01'
  },
];

function BlogPost() {
  const { postId } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(postId));

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="text-blue-500 hover:text-blue-700">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Link to="/blog" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
        ← Back to Blog
      </Link>
      
      <article>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-500 text-sm mb-6">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span className="bg-gray-100 px-2 py-1 rounded">Post ID: {post.id}</span>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>

        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Dynamic Route Information:</h3>
          <p className="text-sm text-green-700">
            This page is rendered using the dynamic route parameter: <code>postId = {postId}</code>.
            The component uses the <code>useParams()</code> hook to extract this value from the URL.
          </p>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;