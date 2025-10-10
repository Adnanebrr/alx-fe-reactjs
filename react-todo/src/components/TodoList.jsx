import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Testing', completed: false },
    { id: 2, text: 'Build Todo List Component', completed: true },
    { id: 3, text: 'Write Comprehensive Tests', completed: false }
  ]);
  
  const [newTodo, setNewTodo] = useState('');

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

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          data-testid="todo-input"
        />
        <button type="submit" data-testid="add-todo-button">
          Add Todo
        </button>
      </form>

      <div>
        <span data-testid="total-todos">Total: {todos.length}</span>
        <span data-testid="completed-todos">
          Completed: {todos.filter(todo => todo.completed).length}
        </span>
      </div>

      {todos.length === 0 ? (
        <div data-testid="empty-message">No todos yet. Add one above!</div>
      ) : (
        <ul data-testid="todo-list">
          {todos.map(todo => (
            <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span data-testid={`todo-text-${todo.id}`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
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