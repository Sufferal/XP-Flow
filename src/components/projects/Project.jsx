import { useRef } from 'react';
import { VARIANT } from '../../constants/styles';
import { Button } from '../buttons/Button';
import { ProjectEditModal } from '../modals/ProjectEditModal';
import { formatDeadline } from '../../utils/date';
import TodoForm from '../forms/TodoForm';
import useTodos from '../../hooks/useTodos';
import Todo from '../todos/Todo';
import { SOUNDPACK_LENGTH } from '../../assets/audio';

export const Project = ({ project, onEdit, onDelete }) => {
  const { id, name, desc, deadline, isPinned } = project;
  const { todos, handleTodoAdd, handleTodoEdit, handleTodoDelete } = useTodos();
  const editProjectRef = useRef(null);
  const currentTodos = todos.filter(t => t.category === name);
  const soundCount = Math.min(currentTodos.filter(t => t.isCompleted).length + 1, SOUNDPACK_LENGTH); // soundpack count starts at 1 

  return (
    <>
      <ProjectEditModal ref={editProjectRef} item={project} onSubmit={onEdit} />
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
            <Button
              variant={VARIANT.outline}
              onClick={() => editProjectRef.current.open()}
            >
              Edit
            </Button>
            <Button onClick={() => onDelete(id)}>Delete</Button>
          </div>
        )}
        <div className="w-96 mt-5">
          <TodoForm category={name} onSubmit={handleTodoAdd} />
          {currentTodos.length ? (
            <ul className="mt-5 mb-5 flex flex-col gap-2">
              {currentTodos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  soundCount={soundCount}
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
