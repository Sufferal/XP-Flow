import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { getYearDate } from '../../utils/date';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { Textarea } from '../inputs/Textarea';
import { getLocalStorageItem } from '../../utils/localStorage';
import { LS_PROJECTS } from '../../constants';

export const ProjectForm = ({ defaultValues = null, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: defaultValues?.id || '',
    name: defaultValues?.name || '',
    desc: defaultValues?.desc || '',
    deadline: defaultValues?.deadline || '',
    parent: defaultValues?.parent || ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        id: defaultValues.id || '',
        name: defaultValues.name || '',
        desc: defaultValues.desc || '',
        deadline: defaultValues.deadline || '',
        parent: defaultValues.parent || '',
      });
    }
  }, [defaultValues]);

  const submitHandler = e => {
    e.preventDefault();
    onClose?.();

    const currName = formData.name.toLowerCase();
    const parentName = formData.parent.toLowerCase();
    const parentProject = getLocalStorageItem(LS_PROJECTS).find(
      p => p.name.toLowerCase() === parentName
    );

    if (parentProject?.parent?.toLowerCase() === currName) {
      alert('This is already the parent task of that child.');
      setFormData(prevFormData => ({
        ...prevFormData, 
        parent: defaultValues.parent || '',
      }))
      return;
    }

    onSubmit({
      ...formData,
      id: formData.id || uuidv4()
    });

    // Reset form data after submission
    setFormData({
      id: '',
      name: '',
      desc: '',
      deadline: '',
      parent: ''
    });
  };

  const maxDueDate = getYearDate(5);

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      <Input
        id="newProjectName"
        name="name"
        label="Name"
        required
        value={formData.name}
        onChange={handleChange}
        autoComplete="off"
      />
      <Textarea
        id="newProjectDesc"
        name="desc"
        label="Description"
        rows="4"
        value={formData.desc}
        onChange={handleChange}
      />
      <Input
        id="newProjectDueDate"
        name="deadline"
        label="Deadline"
        type="date"
        max={maxDueDate}
        value={formData.deadline}
        onChange={handleChange}
      />
      <Input
        id="newProjectParent"
        name="parent"
        label="Parent"
        value={formData.parent}
        onChange={handleChange}
        autoComplete="off"
      />
      <Button fullWidth className="mt-5">
        Save
      </Button>
    </form>
  );
};
