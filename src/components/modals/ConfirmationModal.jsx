import { VARIANT } from "../../constants/styles";
import { Button } from "../buttons/Button";
import { Modal } from "./Modal";

export const ConfirmationModal = ({ ref, title, onSubmit, onClose }) => {
  const handleClose = () => {
    ref.current.close();
    onClose?.();
  };

  return (
    <Modal
      ref={ref}
      width="30%"
      height="25%"
      header={
        <div className="text-slate-900 font-semibold text-xl flex justify-between px-8 mt-8 mb-3 gap-10">
          <h2 className="text-2xl">{title}</h2>
        </div>
      }
      content={
        <div className="px-8 mb-8">
          <p className="italic">This action cannot be undone.</p>
        </div>
      }
      footer={
        <div className="px-8 flex items-stretch gap-3 justify-end">
          <Button variant={VARIANT.outline} onClick={handleClose}>Cancel</Button>
          <Button variant={VARIANT.danger} onClick={onSubmit}>Delete</Button>
        </div>
      }
    />
  );
};
