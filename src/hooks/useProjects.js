import { useState, useEffect } from 'react';
import { LS_PROJECTS, LS_TODOS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

function useProjects(currProjFn) {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem(LS_PROJECTS)) ?? [
      {
        id: uuidv4(),
        name: 'Today',
        desc: 'Every thought, every word, every action plants a seed. How do you wish to feel 1 minute, 1 hour, 1 day from now?',
        isPinned: true,
      },
    ]
  );

  const handleProjectAdd = newProject => {
    setProjects(prevProjects => [...prevProjects, newProject]);
    currProjFn(newProject);
  };

  const handleProjectEdit = updProject => {
    const oldProject = projects.find(p => p.id === updProject.id);
    const newProjects = projects.map(p =>
      p.id === oldProject.id ? updProject : p
    );
    const todos = JSON.parse(localStorage.getItem(LS_TODOS));
    const newTodos = todos.map(t =>
      t.category === oldProject.name ? { ...t, category: updProject.name } : t
    );

    setProjects(newProjects);
    currProjFn(updProject);
    localStorage.setItem(LS_TODOS, JSON.stringify(newTodos));
  };

  const handleProjectDelete = id => {
    const newProjects = projects.filter(p => p.id !== id);
    setProjects(newProjects);
    currProjFn(null);
  };

  useEffect(() => {
    localStorage.setItem(LS_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  return {
    projects,
    handleProjectAdd,
    handleProjectEdit,
    handleProjectDelete,
  };
}

export default useProjects;
