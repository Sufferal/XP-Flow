import { VARIANT } from '../../constants/styles';
import clsx from 'clsx';

const base =
  'font-semibold py-2 px-5 rounded-sm transition-all duration-200';

const variantClasses = {
  [VARIANT.default]:
    'bg-slate-800 text-slate-50 hover:bg-slate-700 active:translate-y-0.5',
  [VARIANT.outline]:
    'border-2 border-slate-800 text-slate-800 hover:bg-slate-200',
  [VARIANT.danger]:
    'bg-red-500 text-slate-50 hover:bg-red-700 active:translate-y-0.5',
  [VARIANT.icon]: 'p-0!',
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
