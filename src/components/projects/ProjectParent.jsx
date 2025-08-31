import { LS_PROJECTS } from '../../constants';
import { getLocalStorageItem } from '../../utils/localStorage';
import { Project } from './Project';

export const ProjectParent = ({ currProjName, parentName }) => {
  const parentProject = getLocalStorageItem(LS_PROJECTS).find(
    p => p.name.toLowerCase() === parentName.toLowerCase()
  );

  if (!parentName || !parentProject) return null;

  const newParentProject = {
    ...parentProject,
    title: `${parentProject.name} ← ${currProjName}`,
    desc: '',
    isPinned: true
  };

  return (
    <div className='border-2 border-slate-900 rounded-md p-5'>
      <Project project={newParentProject} isParent />
    </div>
  );
};
