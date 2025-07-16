import { Sidebar } from "./Sidebar";

export const SidebarProjects = ({ items, currItem, setCurrItem, onAdd }) => {
  return (
    <Sidebar title="My Projects">
      <button
        className="bg-slate-50 hover:bg-slate-300 ease-in duration-200 font-semibold rounded mb-16 py-1 px-3 active:translate-y-0.5"
        onClick={onAdd}
      >
        + Add Project
      </button>
      <ul>
        {items.map(project => (
          <li key={project} className="mb-3">
            <button
              className={`text-slate-50 w-full text-left rounded p-3 ease-in duration-200 ${
                project === currItem
                  ? 'bg-slate-50 text-slate-900 font-bold'
                  : ''
              }`}
              onClick={() => setCurrItem(project)}
            >
              {project}
            </button>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
};
