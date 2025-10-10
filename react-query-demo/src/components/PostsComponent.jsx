import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function PostsComponent() {
  const { 
    data: posts, 
    isLoading, 
    error, 
    isError,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false, // Optional: prevent refetch on window focus
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-lg text-gray-600">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Posts</h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Posts from JSONPlaceholder</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isFetching
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {posts?.length || 0} posts
          </span>
        </div>
      </div>

      {/* Cache Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700 text-sm">
          💡 <strong>React Query Demo:</strong> Navigate away and come back to see cached data load instantly. 
          Click "Refresh Posts" to force a fresh API call.
        </p>
      </div>

      {/* Posts List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {posts?.slice(0, 10).map((post) => (
          <div
            key={post.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
            </p>
            <div className="mt-2 text-xs text-gray-400">
              Post ID: {post.id} | User ID: {post.userId}
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator for refetch */}
      {isFetching && (
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm text-gray-600">Updating posts...</span>
        </div>
      )}

      {/* Instructions for testing */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Testing Instructions:</h4>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>Open Browser DevTools → Network tab</li>
          <li>First load: You'll see API call to JSONPlaceholder</li>
          <li>Navigate away/return: No API call (data from cache)</li>
          <li>Click "Refresh Posts": New API call forced</li>
        </ul>
      </div>
    </div>
  );
}

export default PostsComponent;