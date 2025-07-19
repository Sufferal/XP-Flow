import { useState, useRef } from 'react';
import { NoProjectSelected } from './components/projects/NoProjectSelected';
import { SidebarProjects } from './components/sidebars/SidebarProjects';
import { ProjectAddModal } from './components/modals/ProjectAddModal';
import { Project } from './components/projects/Project';
import { LS_PROJECTS } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

function App() {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem(LS_PROJECTS)) ?? [
      {
        id: uuidv4(),
        name: 'Today',
        desc: `The only moment where karma is truly created. It is cause and effect in motion. Every thought, every word, every action plants a seed. 
      What you choose today determines what you'll experience tomorrow.
      How do you wish to feel 1 minute, 1 hour, 1 day from now?`,
        isPinned: true,
      },
    ]
  );
  const [currentProject, setCurrentProject] = useState(
    !projects.length || projects[0]
  );
  const addProjectRef = useRef(null);

  // Modal handler
  const addProjectHandler = () => addProjectRef.current.open();

  // Project operations
  const handleProjectAdd = newProject => {
    setProjects(prevProjects => [...prevProjects, newProject]);
    setCurrentProject(newProject);
    addProjectRef.current.close();
  };

  const handleProjectEdit = updProject => {
    const newProjects = projects.map(p =>
      p.id === updProject.id ? updProject : p
    );
    setProjects(newProjects);
    setCurrentProject(updProject);
  };

  const handleProjectDelete = name => {
    const newProjects = projects.filter(p => p.name != name);
    setProjects(newProjects);
    setCurrentProject(null);
  };

  useEffect(() => {
    localStorage.setItem(LS_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  return (
    <>
      <ProjectAddModal ref={addProjectRef} onSubmit={handleProjectAdd} />
      <main className="">
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
                item={currentProject}
                onEdit={handleProjectEdit}
                onDelete={handleProjectDelete}
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
