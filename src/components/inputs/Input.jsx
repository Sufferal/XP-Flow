export const Input = ({ label, id, ...props }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-semibold text-slate-600">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="px-2 py-1 rounded-md border-2 border-slate-300 text-slate-900 transition outline-0 focus:border-slate-900"
      />
    </div>
  );
};
