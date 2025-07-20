import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { getCurrentDate, getYearDate } from '../../utils/date';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { Textarea } from '../inputs/Textarea';

export const ProjectForm = ({ defaultValues = null, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: defaultValues?.id || '',
    name: defaultValues?.name || '',
    desc: defaultValues?.desc || '',
    deadline: defaultValues?.deadline || '',
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
      });
    }
  }, [defaultValues]);

  const submitHandlder = e => {
    e.preventDefault();
    onClose?.();
    onSubmit({
      ...formData,
      id: uuidv4()
    });

    // Reset form data after submission
    setFormData({
      id: '',
      name: '',
      desc: '',
      deadline: '',
    });
  };

  const today = getCurrentDate();
  const maxDueDate = getYearDate(5);

  return (
    <form onSubmit={submitHandlder} className="flex flex-col gap-5">
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
        required
        min={today}
        max={maxDueDate}
        value={formData.deadline}
        onChange={handleChange}
      />
      <Button fullWidth className="mt-5">
        Save
      </Button>
    </form>
  );
};
