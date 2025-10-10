import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          React Todo List
        </h1>
        <p className="text-center text-gray-600 mb-8">
          A fully functional todo list with comprehensive testing
        </p>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
