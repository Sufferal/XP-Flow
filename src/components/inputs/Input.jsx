import clsx from 'clsx';

export const Input = ({ label, id, error, className, ref, ...props }) => {
  if (props.type === 'checkbox') {
    const labelStyles =
      "absolute top-0 left-0 w-6 h-6 rounded-full cursor-pointer bg-white border border-slate-900 after:border-2 after:border-white after:border-t-0 after:border-r-0 after:content-[''] after:absolute after:h-[6px] after:w-3 after:-rotate-45 after:left-[5px] after:top-[6px]";
    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={props.checked}
          {...props}
          className={clsx(
            'invisible [&:checked+labeL]:bg-slate-900',
            className
          )}
        />
        <label tabIndex={0} htmlFor={id} className={labelStyles}></label>
      </div>
    );
  }

  return (
    <div className={`flex flex-col`}>
      {label && (
        <label htmlFor={id} className={`${error ? 'mb-0' : 'mb-2'} font-semibold text-slate-600`}>
          {label}
        </label>
      )}
      {error && <p className="text-red-500 mb-2 w-96">{error}</p>}
      <input
        ref={ref}
        id={id}
        {...props}
        className={clsx(
          'px-2 py-1 rounded-md border-2 border-slate-300 text-slate-900 transition outline-0 focus:border-slate-900',
          className
        )}
      />
    </div>
  );
};
