import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            React Query Demo
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Advanced Data Fetching with Caching and Updates
          </p>
          <PostsComponent />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;