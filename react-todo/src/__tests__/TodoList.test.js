import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

test('TodoList component renders with initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
  expect(screen.getByText('Build Todo List Component')).toBeInTheDocument();
  expect(screen.getByText('Write Comprehensive Tests')).toBeInTheDocument();
});

test('TodoList component adds new todo', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  await user.type(screen.getByTestId('todo-input'), 'New Test Todo');
  await user.click(screen.getByTestId('add-todo-button'));
  expect(screen.getByText('New Test Todo')).toBeInTheDocument();
});

test('TodoList component toggles todo completion', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  await user.click(screen.getByTestId('todo-checkbox-1'));
  expect(screen.getByTestId('todo-checkbox-1')).toBeChecked();
});

test('TodoList component deletes todo', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  await user.click(screen.getByTestId('delete-todo-1'));
  expect(screen.queryByText('Learn React Testing')).not.toBeInTheDocument();
});