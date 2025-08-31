import { useState, useEffect, useRef } from 'react';
import { ProjectEditModal } from '../modals/ProjectEditModal';
import { getSoundByKey, SOUNDPACK_LENGTH } from '../../assets/audio';
import { ConfirmationModal } from '../modals/ConfirmationModal';
import { KEYS, LS_TODOS, NUMBERS } from '../../constants';
import { ProjectInfo } from './ProjectInfo';
import { ProjectContent } from './ProjectContent';
import useTodos from '../../hooks/useTodos';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import useAudio from '../../hooks/useAudio';
import { ProjectParent } from './ProjectParent';
import { getLocalStorageItem } from '../../utils/localStorage';

export const Project = ({ project, isParent = false, onEdit, onDelete }) => {
  // State & Custom hooks
  const { id, name } = project;
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
      getLocalStorageItem(LS_TODOS).filter(t => t.category === name)
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
        <ProjectInfo
          project={project}
          editProjectHandler={editProjectHandler}
          deleteProjectHandler={deleteProjectHandler}
        />
        <ProjectContent
          projectName={name}
          currentTodos={currentTodos}
          setTodos={setTodos}
          onTodoAdd={handleTodoAdd}
          onTodoEdit={handleTodoEdit}
          onTodoDelete={handleTodoDelete}
        />
      </div>
      {!isParent && project.parent && (
        <ProjectParent
          currProjName={project.name}
          parentName={project.parent}
        />
      )}
    </>
  );
};
