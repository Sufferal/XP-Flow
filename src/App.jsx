import { useState, useEffect, useRef } from 'react';
import {
  KEYS,
  LS_CURRENT_PROJECT,
  PRIMARY_SHORTCUTS_TIMER,
  SECONDARY_SHORTCUTS_TIMER,
} from './constants';
import { NoProjectSelected } from './components/projects/NoProjectSelected';
import { SidebarProjects } from './components/sidebars/SidebarProjects';
import { ProjectAddModal } from './components/modals/ProjectAddModal';
import { Project } from './components/projects/Project';
import useProjects from './hooks/useProjects';
import { AudioProvider } from './store/AudioContext';
import { Timer } from './components/timers/Timer';
import useKeyboardShortcut from './hooks/useKeyboardShortcut';
import { getLocalStorageItem, setLocalStorageItem } from './utils/localStorage';

function App() {
  const [currentProject, setCurrentProject] =
    useState(getLocalStorageItem(LS_CURRENT_PROJECT)) || null;
  const {
    projects,
    setProjects,
    handleProjectAdd,
    handleProjectEdit,
    handleProjectDelete,
  } = useProjects(setCurrentProject);

  // Modal handler
  const addProjectRef = useRef(null);
  const addProjectHandler = () => addProjectRef.current.open();

  useKeyboardShortcut(KEYS.N, addProjectHandler);

  useEffect(() => {
    setLocalStorageItem(LS_CURRENT_PROJECT, currentProject)
  }, [currentProject]);

  return (
    <AudioProvider>
      <ProjectAddModal ref={addProjectRef} onSubmit={handleProjectAdd} />
      <main>
        <SidebarProjects
          projects={projects}
          setProjects={setProjects}
          currItem={currentProject}
          setCurrItem={setCurrentProject}
          onAdd={addProjectHandler}
        />
        <section
          className={`w-3/4 ml-auto flex gap-20 ${
            !currentProject ? 'h-screen justify-center items-center' : ''
          }`}
        >
          {!currentProject && <NoProjectSelected onClick={addProjectHandler} />}
          {currentProject && (
            <div className="mt-10 ml-10 flex gap-10 w-sm">
              <Project
                project={currentProject}
                onEdit={handleProjectEdit}
                onDelete={handleProjectDelete}
              />
            </div>
          )}
          <div className="flex flex-col mt-10 gap-10">
            <Timer
              title="Work"
              defaultTimer="50:00"
              shortcuts={PRIMARY_SHORTCUTS_TIMER}
            />
            <Timer
              title="Break"
              defaultTimer="20:00"
              shortcuts={SECONDARY_SHORTCUTS_TIMER}
            />
          </div>
        </section>
      </main>
    </AudioProvider>
  );
}

export default App;
