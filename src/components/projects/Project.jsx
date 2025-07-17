import { VARIANT } from "../../constants/styles";
import { Button } from "../buttons/Button";

export const Project = ({ name, desc, deadline, isPinned, onDelete }) => {
  return (
    <div className="flex flex-col gap-2">
      {name && <h2 className="font-semibold text-4xl mb-2">{name}</h2>}
      {(desc || deadline) && (
        <div className="gap-3">
          {desc && <p className="max-w-xl text-left mb-2">{desc}</p>}
          {deadline && <p><span className="font-semibold">Deadline:</span> {deadline}</p>}
        </div>
      )}
      {!isPinned && <Button onClick={() => onDelete(name)}>Delete</Button>}
    </div>
  );
};
