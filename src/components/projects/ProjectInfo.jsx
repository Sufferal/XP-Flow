import { VARIANT } from "../../constants/styles";
import { formatDeadline } from "../../utils/date";
import { Button } from "../buttons/Button";

export const ProjectInfo = ({ project, editProjectHandler, deleteProjectHandler }) => {
  // title is used to customize the heading (e.g. parent project)
  const { name, title = name, desc, deadline, isPinned } = project;

  return (
    <>
      {title && <h2 className="font-semibold text-4xl mb-2 max-w-100 break-words">{title}</h2>}
      {(desc || deadline) && (
        <div className="gap-3">
          {desc && (
            <p className="max-w-xl text-left mb-2 whitespace-pre-wrap">
              {desc}
            </p>
          )}
          {deadline && (
            <p>
              <span className="font-semibold">Deadline:</span>{' '}
              {formatDeadline(deadline)}
            </p>
          )}
        </div>
      )}
      {!isPinned && (
        <div className="flex gap-2">
          <Button variant={VARIANT.outline} onClick={editProjectHandler}>
            Edit
          </Button>
          <Button onClick={deleteProjectHandler}>Delete</Button>
        </div>
      )}
    </>
  );
};
