import classNames from 'classnames';
import { Button as FlowbiteButton } from 'flowbite-react';

export const Button = ({
  text,
  onClick,
  variant = 'default',
  className,
}: {
  text: string | React.ReactNode;
  onClick?: (e: any) => void;
  variant?: 'default' | 'primary';
  className?: string;
}) => {
  const classes = classNames(
    'px-3',
    variant == 'default' && 'bg-green-700 hover:bg-green-800 text-white',
    variant == 'primary' && 'hover:bg-gray-50 text-gray-700',
    className,
  );
  return (
    <FlowbiteButton className={classes} onClick={onClick}>
      {text}
    </FlowbiteButton>
  );
};
