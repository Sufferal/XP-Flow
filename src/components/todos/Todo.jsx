import { useRef, useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { DeleteIcon } from '../icons/DeleteIcon';
import { VARIANT } from '../../constants/styles';
import { EditIcon } from '../icons/EditIcon';
import { SaveIcon } from '../icons/SaveIcon';
import useAudio from '../../hooks/useAudio';
import { SOUNDPACK } from '../../assets/audio';

const Todo = ({ todo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted || false);
  const [newTodo, setNewTodo] = useState(todo.name || '');
  const editInputRef = useRef(null);
  const { playSound } = useAudio();

  const handleToggleCompleted = () => {
    // Play sound only when it's not completed
    if (!isCompleted) {
      playSound(SOUNDPACK.sfxDing);
    }
    setIsCompleted(prev => !prev);
  };

  const handleEdit = e => {
    if (e.relatedTarget?.type === 'submit') {
      return; // don't exit edit mode if Save button was clicked
    }
    setIsEditing(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (newTodo) {
      onEdit({
        ...todo,
        name: newTodo,
      });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    setIsCompleted(todo.isCompleted);
  }, [todo.isCompleted]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (todo.isCompleted !== isCompleted) {
        onEdit({ ...todo, isCompleted });
      }
    }, 2000);
    return () => clearTimeout(timerId);
  }, [isCompleted]);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  let todoContent = (
    <div className="w-full flex items-center justify-between">
      <h2
        className="font-semibold cursor-pointer max-w-[17rem] break-words"
        onClick={handleToggleCompleted}
      >
        {todo.name}
      </h2>
      <div className="flex items-center gap-1">
        <Button
          variant={VARIANT.icon}
          onClick={handleEdit}
          className="[&:hover>svg]:fill-red-500"
        >
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
  );

  if (isCompleted) {
    todoContent = (
      <h2
        className="max-w-[22rem] break-words italic font-semibold bg-slate-900 text-white w-full rounded px-2 py-1 cursor-pointer"
        onClick={handleToggleCompleted}
      >
        {todo.name}
      </h2>
    );
  }

  if (isEditing) {
    todoContent = (
      <div className="w-full">
        <form
          className="flex-grow flex justify-between gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            id={todo.name}
            ref={editInputRef}
            value={newTodo}
            onBlur={handleEdit}
            onChange={e => setNewTodo(e.target.value)}
          />
          <Button variant={VARIANT.icon} type="submit">
            <SaveIcon width="16px" height="16px" color="#0F172A" />
          </Button>
        </form>
      </div>
    );
  }

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
      {todoContent}
    </li>
  );
};

export default Todo;
