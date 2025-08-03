import { useRef, useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { DeleteIcon } from '../icons/DeleteIcon';
import { VARIANT } from '../../constants/styles';
import { EditIcon } from '../icons/EditIcon';
import { SaveIcon } from '../icons/SaveIcon';
import useAudio from '../../hooks/useAudio';
import { getRandomSound } from '../../assets/audio';

const Todo = ({ todo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted || false);
  const [newTodo, setNewTodo] = useState(todo.name || '');
  const editInputRef = useRef(null);
  const { playSound } = useAudio();

  const handleToggleCompleted = () => {
    // Play sound only when it's not completed
    if (!isCompleted) {
      const randomSound = getRandomSound();
      playSound(randomSound);
    }
    setIsCompleted(prev => !prev);
  };

  const handleEdit = () => {
    setIsEditing(prevEdit => !prevEdit);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (newTodo) {
      onEdit({
        ...todo,
        name: newTodo,
      });
    }
    setIsEditing(prevEdit => !prevEdit);
  };

  useEffect(() => {
    setIsCompleted(todo.isCompleted); 
  }, [todo.isCompleted]);

  useEffect(() => {
    if (todo.isCompleted !== isCompleted) {
      onEdit({ ...todo, isCompleted });
    }
  }, [isCompleted]);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className="flex items-center gap-2">
      <div className="mr-3">
        <Input
          id={todo.id}
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleCompleted}
        />
      </div>
      {isCompleted ? (
        <p
          className="italic font-semibold bg-slate-900 text-white w-full rounded px-2 py-1 cursor-pointer"
          onClick={handleToggleCompleted}
        >
          {todo.name}
        </p>
      ) : isEditing ? (
        <div className="w-full flex justify-between gap-2">
          <form className="flex-grow" onSubmit={handleSubmit}>
            <Input
              ref={editInputRef}
              value={newTodo}
              onBlur={handleEdit}
              onChange={e => setNewTodo(e.target.value)}
            />
          </form>
          <Button variant={VARIANT.icon} onClick={handleSubmit}>
            <SaveIcon width="16px" height="16px" color="#0F172A" />
          </Button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between">
          <h2
            className="font-semibold cursor-pointer"
            onClick={handleToggleCompleted}
          >
            {todo.name}
          </h2>
          <div className="flex items-center gap-1">
            <Button variant={VARIANT.icon} onClick={handleEdit} className="[&:hover>svg]:fill-red-500">
              <EditIcon width="24px" height="24px" color="#0F172A" />
            </Button>
            <Button
              variant={VARIANT.icon}
              onClick={onDelete}
              className="[&:hover>svg]:fill-red-500"
            >
              <DeleteIcon width="24px" height="24px" color="#0F172A" />
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Todo;
