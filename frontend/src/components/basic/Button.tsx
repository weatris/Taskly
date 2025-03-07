import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Icon } from '../../images/Icon';
import { cloneElement, ReactElement } from 'react';

export const Button = ({
  text,
  onClick,
  variant = 'default',
  className,
  size = 'md',
  disabled = false,
  icon,
}: {
  text: string | React.ReactNode;
  onClick?: (e: any) => void;
  variant?: 'default' | 'primary';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: ReactElement;
}) => {
  const sizes = {
    sm: 'h-[32px]',
    md: 'h-[40px]',
    lg: '',
  };

  const classes = classNames(
    'flex flex-row gap-2 items-center px-3 rounded-lg shadow-sm border',
    sizes[size],
    variant == 'default' && 'bg-green-700 hover:bg-green-800 text-white',
    variant == 'primary' && 'hover:bg-gray-50 text-gray-700',
    disabled &&
      '!bg-gray-100 hover:bg-gray-50 !text-gray-700 cursor-not-allowed',
    className,
  );
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {!!icon && (
        <Icon className="pl-0" size="md" hoverable={false}>
          {cloneElement(icon, {
            color: variant == 'default' ? 'white' : 'gray',
          })}
        </Icon>
      )}
      <p className="w-full">{text}</p>
    </button>
  );
};
