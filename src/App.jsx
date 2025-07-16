import { useState, useRef } from 'react';
import { NoProjectSelected } from './components/projects/NoProjectSelected';
import { SidebarProjects } from './components/sidebars/SidebarProjects';
import { ProjectAddModal } from './components/modals/ProjectAddModal';

function App() {
  const projects = ['Project 1', 'Project 2', 'Project 3'];
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const addProjectRef = useRef(null);

  const addProjectHandler = () => addProjectRef.current.open();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formEl = e.target;
    const formData = new FormData(formEl);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setTimeout(() => {
      formEl.reset();
    }, 300);

    addProjectRef.current.close();
  };

  return (
    <>
      <ProjectAddModal ref={addProjectRef} onSubmit={handleSubmit} />
      <main className="flex items-center w-screen h-screen overflow-hidden">
        <SidebarProjects
          items={projects}
          currItem={currentProject}
          setCurrItem={setCurrentProject}
          onAdd={addProjectHandler}
        />
        <section className="w-full flex flex-col justify-center items-center">
          <NoProjectSelected onClick={addProjectHandler} />
        </section>
      </main>
    </>
  );
}

export default App;
