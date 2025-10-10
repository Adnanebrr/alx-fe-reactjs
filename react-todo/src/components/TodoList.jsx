import React, { useState } from 'react';

function TodoList() {
  // Initial state with demo todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Testing', completed: false },
    { id: 2, text: 'Build Todo List Component', completed: true },
    { id: 3, text: 'Write Comprehensive Tests', completed: false }
  ]);
  
  const [newTodo, setNewTodo] = useState('');

  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Count todos
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="todo-input"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="add-todo-button"
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Todo Stats */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between text-sm text-gray-600">
          <span data-testid="total-todos">Total: {totalTodos}</span>
          <span data-testid="completed-todos">Completed: {completedTodos}</span>
          <span data-testid="pending-todos">Pending: {totalTodos - completedTodos}</span>
        </div>
      </div>

      {/* Todo List */}
      {todos.length === 0 ? (
        <div className="text-center py-8 text-gray-500" data-testid="empty-message">
          No todos yet. Add one above!
        </div>
      ) : (
        <ul className="space-y-3" data-testid="todo-list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                todo.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              data-testid={`todo-item-${todo.id}`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  data-testid={`todo-checkbox-${todo.id}`}
                />
                <span
                  className={`text-lg ${
                    todo.completed 
                      ? 'line-through text-gray-400' 
                      : 'text-gray-800'
                  }`}
                  data-testid={`todo-text-${todo.id}`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                data-testid={`delete-todo-${todo.id}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;