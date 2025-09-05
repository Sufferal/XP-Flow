import { useState, useEffect, useRef } from 'react';
import {
  KEYS,
  LS_CURRENT_PROJECT,
} from './constants';
import { NoProjectSelected } from './components/projects/NoProjectSelected';
import { SidebarProjects } from './components/sidebars/SidebarProjects';
import { ProjectAddModal } from './components/modals/ProjectAddModal';
import { Project } from './components/projects/Project';
import useProjects from './hooks/useProjects';
import { AudioProvider } from './store/AudioContext';
import useKeyboardShortcut from './hooks/useKeyboardShortcut';
import { getLocalStorageItem, setLocalStorageItem } from './utils/localStorage';
import { TimerList } from './components/timers/TimerList';

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
    setLocalStorageItem(LS_CURRENT_PROJECT, currentProject);
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
            <TimerList />
          </div>
        </section>
      </main>
    </AudioProvider>
  );
}

export default App;
