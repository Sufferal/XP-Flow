import { useState, useEffect, useRef } from 'react';
import { VARIANT } from '../../constants/styles';
import { Button } from '../buttons/Button';
import { ProjectEditModal } from '../modals/ProjectEditModal';
import { formatDeadline } from '../../utils/date';
import TodoForm from '../forms/TodoForm';
import useTodos from '../../hooks/useTodos';
import Todo from '../todos/Todo';
import { getSoundByKey, SOUNDPACK_LENGTH } from '../../assets/audio';
import { ConfirmationModal } from '../modals/ConfirmationModal';
import { TodoActions } from '../todos/TodoActions';
import { KEYS, LS_TODOS, NUMBERS } from '../../constants';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import useAudio from '../../hooks/useAudio';

export const Project = ({ project, onEdit, onDelete }) => {
  // State & Custom hooks
  const { id, name, desc, deadline, isPinned } = project;
  const { todos, setTodos, handleTodoAdd, handleTodoEdit, handleTodoDelete } =
    useTodos();
  const [currentTodos, setCurrentTodos] = useState(
    todos.filter(t => t.category === name)
  );

  // Refs
  const editProjectRef = useRef(null);
  const editProjectHandler = () => editProjectRef.current.open();
  const confirmationDeleteRef = useRef(null);
  const deleteProjectHandler = () => confirmationDeleteRef.current.open();

  // Sound
  const soundCount = Math.min(
    currentTodos.filter(t => t.isCompleted).length + 1,
    SOUNDPACK_LENGTH
  ); // soundpack count starts at 1
  const { playSound } = useAudio();

  const toggleTodoCompletion = index => {
    if (!currentTodos.length) return;

    const currTodo = currentTodos[index];

    if (currTodo) {
      if (!currTodo.isCompleted) {
        const randomSound = getSoundByKey('sfxDeathblow');
        playSound(randomSound);
      }
      const newTodos = todos.map(t =>
        t.id === currTodo.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      setTodos(newTodos);
    }
  };

  // Update current todos when changing the name of the project
  useEffect(() => {
    setCurrentTodos(
      JSON.parse(localStorage.getItem(LS_TODOS)).filter(
        t => t.category === name
      )
    );
  }, [name, todos]);

  // Keyboard shortcuts
  useKeyboardShortcut(KEYS.E, editProjectHandler);
  useKeyboardShortcut(KEYS.D, deleteProjectHandler);
  NUMBERS.forEach((key, index) => {
    useKeyboardShortcut(key, () => toggleTodoCompletion(index));
  });

  return (
    <>
      <ProjectEditModal ref={editProjectRef} item={project} onSubmit={onEdit} />
      <ConfirmationModal
        ref={confirmationDeleteRef}
        title="Are you sure you want to delete this project?"
        onSubmit={() => onDelete(id)}
      />
      <div className="flex flex-col gap-2">
        {name && <h2 className="font-semibold text-4xl mb-2">{name}</h2>}
        {(desc || deadline) && (
          <div className="gap-3">
            {desc && (
              <p className="max-w-xl text-left mb-2 whitespace-pre-wrap">
                {desc}
              </p>
            )}
            {deadline && (
              <p>
                <span className="font-semibold">Deadline:</span>{' '}
                {formatDeadline(deadline)}
              </p>
            )}
          </div>
        )}
        {!isPinned && (
          <div className="flex gap-2">
            <Button variant={VARIANT.outline} onClick={editProjectHandler}>
              Edit
            </Button>
            <Button onClick={deleteProjectHandler}>Delete</Button>
          </div>
        )}
        <div className="w-96 mt-5">
          <TodoForm category={name} onSubmit={handleTodoAdd} />
          {currentTodos.length > 0 && (
            <div className="mt-3">
              <TodoActions
                todos={currentTodos}
                setTodos={setTodos}
                onDelete={handleTodoDelete}
              />
            </div>
          )}
          {currentTodos.length ? (
            <ul className="mt-5 mb-5 flex flex-col gap-2">
              {currentTodos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onEdit={handleTodoEdit}
                  onDelete={() => handleTodoDelete(todo.id)}
                />
              ))}
            </ul>
          ) : (
            <p className="mt-5 italic font-semibold">
              <span className="rounded text-white bg-slate-900 px-2 py-1">
                No tasks
              </span>{' '}
              Create one to get started
            </p>
          )}
        </div>
      </div>
    </>
  );
};
