import classNames from 'classnames';

export const Icon = ({
  onClick,
  children,
  className = '',
  hoverable = true,
}: {
  onClick?: (e: any) => void;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}) => {
  const classes = classNames(
    'w-8 h-8 p-[2px] rounded-md',
    hoverable && 'hover:bg-gray-50',
    className
  );

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
