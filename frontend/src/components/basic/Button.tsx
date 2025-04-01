import classNames from 'classnames';
import { Icon } from '../../images/Icon';
import { cloneElement, ReactElement } from 'react';
import { Spinner } from './Spinner';

const sizes = {
  sm: 'h-[32px]',
  md: 'h-[40px]',
  lg: '',
};

const variants = {
  default: 'bg-green-700 hover:bg-green-800 text-white',
  primary: 'hover:bg-gray-50 text-gray-700',
  secondary: 'bg-red-800 hover:bg-red-900 text-white',
};

export const Button = ({
  text,
  onClick,
  variant = 'default',
  className,
  size = 'md',
  disabled = false,
  icon,
  isLoading,
}: {
  text?: string | React.ReactNode;
  onClick?: (e: any) => void;
  variant?: keyof typeof variants;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: ReactElement;
  isLoading?: boolean;
}) => {
  const classes = classNames(
    'flex flex-row gap-2 items-center px-3 rounded-lg shadow-sm border',
    sizes[size],
    variants[variant],
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
      {isLoading ? (
        <Spinner size="sm" />
      ) : text ? (
        <p className="w-full text-nowrap">{text}</p>
      ) : (
        <></>
      )}
    </button>
  );
};
