import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const { 
    data: posts, 
    isLoading, 
    error, 
    isError,
    refetch,
    isFetching,
    isPreviousData 
  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: fetchPosts,
    cacheTime: 5 * 60 * 1000, // 5 minutes cache time
    staleTime: 2 * 60 * 1000, // 2 minutes stale time
    keepPreviousData: true, // Keep previous data while fetching new data
    refetchOnWindowFocus: false,
  });

  // Calculate pagination
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = posts?.slice(startIndex, endIndex);
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0;

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

      {/* Cache Configuration Display */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">React Query Cache Configuration:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border">
            <strong>cacheTime:</strong> 5 minutes
            <p className="text-gray-600 text-xs mt-1">Data stays in cache for 5 minutes after unmount</p>
          </div>
          <div className="bg-white p-3 rounded border">
            <strong>staleTime:</strong> 2 minutes
            <p className="text-gray-600 text-xs mt-1">Data considered fresh for 2 minutes</p>
          </div>
          <div className="bg-white p-3 rounded border">
            <strong>keepPreviousData:</strong> true
            <p className="text-gray-600 text-xs mt-1">Shows old data while fetching new data</p>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Next
          </button>
        </div>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
          {isPreviousData && <span className="ml-2 text-blue-500">(Loading next page...)</span>}
        </span>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {displayedPosts?.map((post) => (
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

      {/* Testing Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Testing Cache Features:</h4>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li><strong>cacheTime:</strong> Navigate away and return within 5 minutes - data loads instantly from cache</li>
          <li><strong>staleTime:</strong> Data stays fresh for 2 minutes before refetching</li>
          <li><strong>keepPreviousData:</strong> Switch pages smoothly without blank screens</li>
          <li>Check Network tab to see reduced API calls due to caching</li>
        </ul>
      </div>
    </div>
  );
}

export default PostsComponent;