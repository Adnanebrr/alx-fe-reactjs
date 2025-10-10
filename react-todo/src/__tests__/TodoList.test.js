import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
    expect(screen.getByText('Build Todo List Component')).toBeInTheDocument();
    expect(screen.getByText('Write Comprehensive Tests')).toBeInTheDocument();
  });

  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion status when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const todoCheckbox = screen.getByTestId('todo-checkbox-1');
    const todoText = screen.getByTestId('todo-text-1');
    
    await user.click(todoCheckbox);
    expect(todoCheckbox).toBeChecked();
    
    await user.click(todoCheckbox);
    expect(todoCheckbox).not.toBeChecked();
  });

  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-todo-1');
    await user.click(deleteButton);
    
    expect(screen.queryByText('Learn React Testing')).not.toBeInTheDocument();
  });
});