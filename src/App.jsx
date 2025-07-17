import { useState, useEffect, useRef } from 'react';
import { NoProjectSelected } from './components/projects/NoProjectSelected';
import { SidebarProjects } from './components/sidebars/SidebarProjects';
import { ProjectAddModal } from './components/modals/ProjectAddModal';
import { Project } from './components/projects/Project';
import { formatDeadline } from './utils/date';
import { LS_PROJECTS } from './constants';

function App() {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem(LS_PROJECTS)) ?? [
      {
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

  const addProjectHandler = () => addProjectRef.current.open();
  const handleProjectAdd = e => {
    e.preventDefault();

    const formEl = e.target;
    const fd = new FormData(formEl);

    const data = Object.fromEntries(fd.entries());
    const newProject = {
      name: data.name,
      desc: data.desc,
      deadline: formatDeadline(data.deadline),
    };

    setProjects(prevProjects => [...prevProjects, newProject]);
    setCurrentProject(newProject);

    setTimeout(() => {
      formEl.reset();
      localStorage.setItem(LS_PROJECTS, JSON.stringify([...projects, newProject]))
    }, 300);

    addProjectRef.current.close();
  };

  const handleProjectDelete = name => {
    const newProjects = projects.filter(p => p.name != name);
    setProjects(newProjects);
    setCurrentProject(null);
  };
  
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
              <Project {...currentProject} onDelete={handleProjectDelete} />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
