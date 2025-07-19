import { useRef } from 'react';
import { VARIANT } from '../../constants/styles';
import { Button } from '../buttons/Button';
import { ProjectEditModal } from '../modals/ProjectEditModal';
import { formatDeadline } from '../../utils/date';

export const Project = ({ item, onEdit, onDelete }) => {
  const editProjectRef = useRef(null);
  const { name, desc, deadline, isPinned } = item;

  return (
    <>
      <ProjectEditModal ref={editProjectRef} item={item} onSubmit={onEdit} />
      <div className="flex flex-col gap-2">
        {name && <h2 className="font-semibold text-4xl mb-2">{name}</h2>}
        {(desc || deadline) && (
          <div className="gap-3">
            {desc && <p className="max-w-xl text-left mb-2">{desc}</p>}
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
            <Button onClick={() => onDelete(name)}>Delete</Button>
          </div>
        )}
      </div>
    </>
  );
};
