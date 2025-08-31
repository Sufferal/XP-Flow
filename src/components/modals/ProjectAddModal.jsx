import { MODAL_PROJECT_HEIGHT } from '../../constants/styles';
import { ProjectForm } from '../forms/ProjectForm';
import { Modal } from './Modal';

export const ProjectAddModal = ({ ref, onSubmit }) => {
  const handleClose = () => {
    ref.current.close();
  };

  return (
    <Modal
      ref={ref}
      height={MODAL_PROJECT_HEIGHT}
      header={
        <div className="text-slate-900 font-semibold text-xl flex justify-between px-8 mt-6 mb-3">
          <h2 className='text-2xl'>Create a new project</h2>
          <button onClick={handleClose} className='text-4xl'>&times;</button>
        </div>
      }
      content={
        <div className='px-8'>
          <ProjectForm onSubmit={onSubmit} onClose={handleClose} /> 
        </div>
      }
    />
  );
};
