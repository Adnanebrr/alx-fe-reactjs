import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if component renders
    expect(screen.getByText('React Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
    expect(screen.getByText('Build Todo List Component')).toBeInTheDocument();
    expect(screen.getByText('Write Comprehensive Tests')).toBeInTheDocument();
    
    // Check if todo list is present
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    
    // Check if form elements are present
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
  });

  // Test 2: Adding Todos
  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Add a new todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if input is cleared after submission
    expect(input).toHaveValue('');
  });

  // Test 3: Toggling Todos
  test('toggles todo completion status when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find the first todo's checkbox and text
    const todoCheckbox = screen.getByTestId('todo-checkbox-1');
    const todoText = screen.getByTestId('todo-text-1');
    
    // Initially should not be completed
    expect(todoCheckbox).not.toBeChecked();
    expect(todoText).not.toHaveClass('line-through');
    
    // Toggle to completed
    await user.click(todoCheckbox);
    
    // Should now be completed
    expect(todoCheckbox).toBeChecked();
    expect(todoText).toHaveClass('line-through');
    
    // Toggle back to not completed
    await user.click(todoCheckbox);
    
    // Should be not completed again
    expect(todoCheckbox).not.toBeChecked();
    expect(todoText).not.toHaveClass('line-through');
  });

  // Test 4: Deleting Todos
  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Check initial count
    const initialTotal = screen.getByTestId('total-todos');
    expect(initialTotal).toHaveTextContent('Total: 3');
    
    // Find and click delete button for first todo
    const deleteButton = screen.getByTestId('delete-todo-1');
    await user.click(deleteButton);
    
    // Check if todo is removed
    expect(screen.queryByText('Learn React Testing')).not.toBeInTheDocument();
    
    // Check if count is updated
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 2');
  });

  // Test 5: Empty Todo List
  test('shows empty message when no todos exist', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText('Delete');
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Check if empty message is shown
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    
    // Check if todo list is not present
    expect(screen.queryByTestId('todo-list')).not.toBeInTheDocument();
  });

  // Test 6: Todo Statistics
  test('displays correct todo statistics', () => {
    render(<TodoList />);
    
    // Check initial statistics
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 3');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('Completed: 1');
    expect(screen.getByTestId('pending-todos')).toHaveTextContent('Pending: 2');
  });

  // Test 7: Prevent Empty Todo Addition
  test('does not add empty todo when input is empty', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTotal = screen.getByTestId('total-todos');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Try to add empty todo
    await user.click(addButton);
    
    // Count should remain the same
    expect(initialTotal).toHaveTextContent('Total: 3');
  });

  // Test 8: Form Submission with Enter Key
  test('adds todo when enter key is pressed in input', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    // Type and press enter
    await user.type(input, 'Todo with Enter Key{enter}');
    
    // Check if todo is added
    expect(screen.getByText('Todo with Enter Key')).toBeInTheDocument();
  });
});