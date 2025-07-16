import { VARIANT } from '../../constants/styles';

export const Button = ({ variant = VARIANT.default, fullWidth = false, className, children, ...props }) => {
  let buttonStyles = '';
  const defaultStyles =
    'bg-slate-800 text-slate-50 hover:bg-slate-700 ease-in duration-200 font-semibold rounded py-2 px-5 active:translate-y-0.5';
  const outlineStyles = 'border border-slate-800 text-slate-800 hover:bg-slate-200 ease-in duration-200 font-semibold py-2 px-5 rounded';

  if (variant === VARIANT.default) buttonStyles = defaultStyles;
  if (variant === VARIANT.outline) buttonStyles = outlineStyles;
  if (fullWidth) buttonStyles += ' w-full';
  if (className) buttonStyles += ` ${className}`;

  return (
    <button {...props} className={buttonStyles}>
      {children}
    </button>
  );
};
