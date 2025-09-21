import { MODAL_PROJECT_HEIGHT } from '../../constants/styles';
import { ProjectForm } from '../forms/ProjectForm';
import { Modal } from './Modal';

export const ProjectEditModal = ({ ref, item, onSubmit }) => {
  const handleClose = () => {
    ref.current.close();
  };

  return (
    <Modal
      ref={ref}
      height={MODAL_PROJECT_HEIGHT}
      header={
        <div className="text-slate-900 font-semibold text-xl flex justify-between px-8 mt-6 mb-3">
          <h2 className='text-2x'>Edit <span className='bg-slate-900 text-white rounded-sm px-2'>{item.name}</span> project</h2>
          <button onClick={handleClose} className='text-4xl'>&times;</button>
        </div>
      }
      content={
        <div className='px-8'>
          <ProjectForm defaultValues={item} onSubmit={onSubmit} onClose={handleClose} /> 
        </div>
      }
    />
  );
};
