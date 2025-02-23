import classNames from 'classnames';
import { Stack } from '../components/Stack/Stack';

const sizes = {
  sm: 'w-4 h-4 min-w-4 min-h-4',
  md: 'w-6 h-6 min-w-6 min-h-6',
  lg: 'w-8 h-8 min-w-8 min-h-8',
};

export const Icon = ({
  onClick,
  children,
  className = '',
  hoverable = true,
  size = 'lg',
}: {
  onClick?: (e: any) => void;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  size?: keyof typeof sizes;
}) => {
  const classes = classNames(
    sizes[size],
    'p-[2px] rounded-md',
    hoverable && 'hover:bg-gray-100 cursor-pointer',
    className,
  );

  return (
    <Stack
      className={classes}
      onClick={onClick}
      direction="row"
      alignItems="center"
    >
      {children}
    </Stack>
  );
};
