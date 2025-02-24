import classNames from 'classnames';

export const Button = ({
  text,
  onClick,
  variant = 'default',
  className,
  size = 'md',
  disabled = false,
}: {
  text: string | React.ReactNode;
  onClick?: (e: any) => void;
  variant?: 'default' | 'primary';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}) => {
  const sizes = {
    sm: 'h-[32px]',
    md: 'h-[40px]',
    lg: '',
  };

  const classes = classNames(
    'px-3 rounded-lg shadow-sm border',
    sizes[size],
    variant == 'default' && 'bg-green-700 hover:bg-green-800 text-white',
    variant == 'primary' && 'hover:bg-gray-50 text-gray-700',
    disabled &&
      '!bg-gray-100 hover:bg-gray-50 !text-gray-700 cursor-not-allowed',
    className,
  );
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
