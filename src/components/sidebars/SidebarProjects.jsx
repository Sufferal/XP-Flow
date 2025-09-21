import { useCallback, useState } from 'react';
import { Sidebar } from './Sidebar';

export const SidebarProjects = ({
  projects,
  setProjects,
  currItem,
  setCurrItem,
  onAdd,
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleDragStart = useCallback(index => {
    setDraggedItem(index);
  }, []);

  const handleDragEnter = useCallback(index => {
    setDragOverItem(index);
  }, []);

  const handleDragOver = useCallback(e => {
    e.preventDefault(); // allow drop
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverItem(null);
  }, []);

  const handleDrop = useCallback(index => {
    const items = [...projects];
    const item = items[draggedItem];

    items.splice(draggedItem, 1); // remove dragged
    items.splice(index, 0, item); // insert at new index

    setProjects(items);
    setDraggedItem(null);
    setDragOverItem(null);
  }, [projects, draggedItem]);

  return (
    <Sidebar title="My Projects">
      <button
        className="bg-slate-50 hover:bg-slate-300 ease-in duration-200 font-semibold rounded-sm mb-16 py-1 px-3 active:translate-y-0.5"
        onClick={onAdd}
      >
        + Add Project
      </button>
      <ul>
        {projects.map((project, index) => (
          <li
            key={project.name}
            className={`mb-3 rounded border border-transparent transition ${
              draggedItem === index
                ? 'opacity-50'
                : dragOverItem === index
                ? 'border-white!'
                : 'bg-slate-900 hover:bg-slate-700'
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop(index)}
          >
            <button
              className={`truncate text-slate-50 w-full text-left rounded p-3 ease-in duration-200 ${
                project.name === currItem?.name
                  ? 'bg-slate-50 text-slate-900 font-bold'
                  : ''
              }`}
              onClick={() =>
                setCurrItem(prevProject =>
                  prevProject === project ? null : project
                )
              }
            >
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
};
