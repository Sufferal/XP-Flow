import { getCurrentDate, getYearDate } from '../../utils/date';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { Textarea } from '../inputs/Textarea';

export const NewProjectForm = ({ onSubmit }) => {
  const today = getCurrentDate();
  const maxDueDate = getYearDate(5);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Input id="newProjectName" name="name" label="Name" required />
      <Textarea id="newProjectDesc" name="desc" label="Description" rows="4" />
      <Input id="newProjectDueDate" name="deadline" label="Deadline" type="date" required min={today} max={maxDueDate} />
      <Button fullWidth className="mt-5">
        Save
      </Button>
    </form>
  );
};
