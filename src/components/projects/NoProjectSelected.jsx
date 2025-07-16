import noProjectsImg from '../../assets/no-projects.png';
import { Button } from '../buttons/Button';

export const NoProjectSelected = ({ onClick }) => {
  return (
    <>
      <img src={noProjectsImg} alt="" className="w-20 h-auto mb-5" />
      <h2 className="font-semibold text-2xl text-slate-900 mb-2">
        No project selected
      </h2>
      <p className="italic mb-8">
        Select a project or get started with a new one
      </p>
      <Button onClick={onClick}>Create new project</Button>
    </>
  );
};
