import { useState, useEffect } from 'react';
import { LS_PROJECTS, LS_TODOS, NUMBER_SPECIAL_KEYS } from '../constants';
import useKeyboardShortcut from './useKeyboardShortcut';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';
import { MOCK_PROJECTS } from '../mocks/project';

function useProjects(currProjFn) {
  const [projects, setProjects] = useState(
    getLocalStorageItem(LS_PROJECTS) ?? MOCK_PROJECTS
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
    const todos = getLocalStorageItem(LS_TODOS);
    const newTodos = todos.map(t =>
      t.category === oldProject.name ? { ...t, category: updProject.name } : t
    );

    setProjects(newProjects);
    currProjFn(updProject);
    setLocalStorageItem(LS_TODOS, newTodos);
  };

  const handleProjectDelete = id => {
    const deletedProject = projects.find(p => p.id === id);
    const newProjects = projects.filter(p => p.id !== id);
    const todos = getLocalStorageItem(LS_TODOS);
    const newTodos = todos.filter(t => t.category !== deletedProject.name);

    setProjects(newProjects);
    currProjFn(null);
    setLocalStorageItem(LS_TODOS, newTodos);
  };

  useEffect(() => {
    setLocalStorageItem(LS_PROJECTS, projects);
  }, [projects]);

  NUMBER_SPECIAL_KEYS.forEach((key, index) => {
    useKeyboardShortcut(key, () => currProjFn(projects[index] ?? null));
  });

  return {
    projects,
    setProjects,
    handleProjectAdd,
    handleProjectEdit,
    handleProjectDelete,
  };
}

export default useProjects;
