import { useState, useEffect, useRef } from 'react';
import { LS_CURRENT_PROJECT } from './constants';
import { NoProjectSelected } from './components/projects/NoProjectSelected';
import { SidebarProjects } from './components/sidebars/SidebarProjects';
import { ProjectAddModal } from './components/modals/ProjectAddModal';
import { Project } from './components/projects/Project';
import useProjects from './hooks/useProjects';
import { AudioProvider } from './store/AudioContext';

function App() {
  const [currentProject, setCurrentProject] = useState(
    JSON.parse(localStorage.getItem(LS_CURRENT_PROJECT)) || null
  );
  const { projects, handleProjectAdd, handleProjectEdit, handleProjectDelete } =
    useProjects(setCurrentProject);

  // Modal handler
  const addProjectRef = useRef(null);
  const addProjectHandler = () => addProjectRef.current.open();

  useEffect(() => {
    localStorage.setItem(LS_CURRENT_PROJECT, JSON.stringify(currentProject));
  }, [currentProject]);

  return (
    <AudioProvider>
      <ProjectAddModal ref={addProjectRef} onSubmit={handleProjectAdd} />
      <main>
        <SidebarProjects
          items={projects}
          currItem={currentProject}
          setCurrItem={setCurrentProject}
          onAdd={addProjectHandler}
        />
        <section
          className={`w-3/4 ml-auto flex flex-col ${
            !currentProject ? 'h-screen justify-center items-center' : ''
          }`}
        >
          {!currentProject && <NoProjectSelected onClick={addProjectHandler} />}
          {currentProject && (
            <div className="mt-10 ml-10">
              <Project
                project={currentProject}
                onEdit={handleProjectEdit}
                onDelete={handleProjectDelete}
              />
            </div>
          )}
        </section>
      </main>
    </AudioProvider>
  );
}

export default App;
