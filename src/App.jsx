import { useState, useEffect, useRef } from 'react';
import { APP_MODES, KEYS, LS_APP_MODE, LS_CURRENT_PROJECT } from './constants';
import { NoProjectSelected } from './components/projects/NoProjectSelected';
import { SidebarProjects } from './components/sidebars/SidebarProjects';
import { ProjectAddModal } from './components/modals/ProjectAddModal';
import { Project } from './components/projects/Project';
import useProjects from './hooks/useProjects';
import useKeyboardShortcut from './hooks/useKeyboardShortcut';
import { getLocalStorageItem, setLocalStorageItem } from './utils/localStorage';
import { TimerList } from './components/timers/TimerList';

function App() {
  const [appMode, setAppMode] = useState(
    getLocalStorageItem(LS_APP_MODE) || APP_MODES.default
  );
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

  const toggleAppMode = mode => {
    setAppMode(prevMode =>
      prevMode === APP_MODES.default ? mode : APP_MODES.default
    );
  };

  const handleAppModeChange = () => {
    const hasUserConfirmed = window.confirm(
      'Are you sure you want to switch the app mode? All unsaved data will be lost.'
    );
    if (hasUserConfirmed) {
      toggleAppMode(APP_MODES.focus);
    }
  };

  useKeyboardShortcut(KEYS.N, addProjectHandler);
  useKeyboardShortcut(KEYS.F, handleAppModeChange);

  useEffect(() => {
    setLocalStorageItem(LS_CURRENT_PROJECT, currentProject);
  }, [currentProject]);

  useEffect(() => {
    setLocalStorageItem(LS_APP_MODE, appMode);
  }, [appMode]);

  if (appMode === APP_MODES.focus) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
        <TimerList />
      </div>
    );
  }

  return (
    <>
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
            <div className="mt-10 ml-10 flex gap-10">
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
    </>
  );
}

export default App;
