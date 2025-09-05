import { LS_PROJECTS, LS_TODOS } from '../../constants';
import { formatDeadline } from '../../utils/date';
import { getLocalStorageItem } from '../../utils/localStorage';
import { Heading } from '../headings/Heading';

export const ProjectParent = ({ currProjName, parentName }) => {
  const parentProject = getLocalStorageItem(LS_PROJECTS).find(
    p => p.name.toLowerCase() === parentName.toLowerCase()
  );

  if (!parentName || !parentProject) return null;

  const newParentProject = {
    ...parentProject,
    title: `${parentProject.name} ← ${currProjName}`,
    isPinned: true,
  };
  const { title, desc, deadline } = newParentProject;

  const parentTodos = getLocalStorageItem(LS_TODOS).filter(
    t => t.category === newParentProject.name
  );
  let todosContent = (
    <p className="text-center mt-5 italic font-bold text-red-500">
      This project does not have any tasks!
    </p>
  );

  if (parentTodos.length) {
    todosContent = (
      <ol className='list-decimal mx-10 mt-5'>
        {parentTodos.map(t => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ol>
    );
  }

  return (
    <div className="border-2 border-slate-900 rounded-md p-5">
      <Heading title={title} />
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
      {todosContent}
    </div>
  );
};
