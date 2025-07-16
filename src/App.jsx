import { useState, useRef } from 'react';
import { NoProjectSelected } from './components/project/NoProjectSelected';
import { SidebarProjects } from './components/sidebar/SidebarProjects';
import { ProjectAddModal } from './components/modal/ProjectAddModal';

function App() {
  const projects = ['Project 1', 'Project 2', 'Project 3'];
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const addProjectRef = useRef(null);

  const addProjectHandler = () => addProjectRef.current.open();

  return (
    <>
      <ProjectAddModal ref={addProjectRef} />
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
