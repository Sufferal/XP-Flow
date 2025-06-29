import { useState } from 'react';
import { Sidebar } from './components/sidebar/Sidebar';
import { NoProjectSelected } from './components/project/NoProjectSelected';
import { SidebarProjects } from './components/sidebar/SidebarProjects';

function App() {
  const projects = ['Project 1', 'Project 2', 'Project 3'];
  const [currentProject, setCurrentProject] = useState(projects[0]);

  const addProjectHandler = () => console.log('add project');

  return (
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
  );
}

export default App;
