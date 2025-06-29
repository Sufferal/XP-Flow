import noProjectsImg from '../../assets/no-projects.png';

export const NoProjectSelected = ({ onClick }) => {
  return (
    <>
      <img src={noProjectsImg} alt="" className="w-20 h-auto mb-5" />
      <h2 className='font-semibold text-2xl text-slate-900 mb-2'>No project selected</h2>
      <p className='italic mb-8'>Select a project or get started with a new one</p>
      <button
        className="bg-slate-800 text-slate-50 hover:bg-slate-700 ease-in duration-200 font-semibold rounded mb-16 py-2 px-5 active:translate-y-0.5"
        onClick={onClick}
      >
        Create new project
      </button>
    </>
  );
};
