import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Profile from './components/Profile';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const isAuthenticated = false; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation isAuthenticated={isAuthenticated} />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route 
              path="/profile/*" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;