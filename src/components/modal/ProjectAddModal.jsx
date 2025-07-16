import { Modal } from './Modal';

export const ProjectAddModal = ({ ref }) => {
  const handleClick = () => {
    ref.current.close();
  };

  return (
    <Modal
      ref={ref}
      header={<p>Header</p>}
      content={<p>Content</p>}
      footer={
        <>
          <p>Footer</p>
          <button className="bg-slate-900 text-white" onClick={handleClick}>
            Close
          </button>
        </>
      }
    />
  );
};
