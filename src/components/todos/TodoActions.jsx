import { useRef } from 'react';
import { COMPLETED, UNCHECKED } from '../../constants';
import { VARIANT } from '../../constants/styles';
import { Button } from '../buttons/Button';
import { ConfirmationModal } from '../modals/ConfirmationModal';

export const TodoActions = ({ todos, setTodos }) => {
  const confirmationDeleteRef = useRef(null);
  const areAllTodosCompleted = todos.every(t => t.isCompleted);
  const completeStatus = areAllTodosCompleted ? UNCHECKED : COMPLETED;

  const handleToggleCompleteAll = () => {
    const newCompletedStatus = completeStatus === COMPLETED;

    setTodos(prevTodos =>
      prevTodos.map(t =>
        todos.find(current => current.id === t.id)
          ? { ...t, isCompleted: newCompletedStatus }
          : t
      )
    );
  };

  const handleDeleteAll = () => {
    setTodos(prevTodos =>
      prevTodos.filter(t => !todos.some(current => current.id === t.id))
    );
    confirmationDeleteRef.current.close();
  };

  return (
    <>
      <ConfirmationModal
        ref={confirmationDeleteRef}
        title="Are you sure you want to delete all the tasks?"
        onSubmit={handleDeleteAll}
      />
      <div className="flex items-center gap-3">
        <Button onClick={handleToggleCompleteAll} fullWidth>{completeStatus} all</Button>
        <Button
          onClick={() => confirmationDeleteRef.current.open()}
          variant={VARIANT.danger}
          fullWidth
        >
          Delete all
        </Button>
      </div>
    </>
  );
};
