import { VARIANT } from '../../constants/styles';
import clsx from 'clsx';

const base =
  'inline-flex items-center justify-center font-semibold py-2 px-5 rounded transition-all duration-200';

const variantClasses = {
  [VARIANT.default]:
    'bg-slate-800 text-slate-50 hover:bg-slate-700 active:translate-y-0.5',
  [VARIANT.outline]:
    'border border-slate-800 text-slate-800 hover:bg-slate-200',
  [VARIANT.danger]:
    'bg-red-500 text-slate-50 hover:bg-red-700 active:translate-y-0.5',
};

export const Button = ({
  variant = VARIANT.default,
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        base,
        fullWidth ? 'w-full' : 'max-w-max',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
