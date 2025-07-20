import { useState, useEffect } from 'react';
import { LS_TODOS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

function useTodos() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(LS_TODOS)) ?? [
      {
        id: uuidv4(),
        name: 'Meditate',
        category: 'Today',
        isCompleted: false,
      },
    ]
  );

  const handleTodoAdd = newTodo => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleTodoEdit = updTodo => {
    const newTodos = todos.map(t => (t.id === updTodo.id ? updTodo : t));
    setTodos(newTodos);
  };

  const handleTodoDelete = id => {
    const newTodos = todos.filter(t => t.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem(LS_TODOS, JSON.stringify(todos));
  }, [todos]);

  return {
    todos,
    handleTodoAdd,
    handleTodoEdit,
    handleTodoDelete,
  };
}

export default useTodos;
