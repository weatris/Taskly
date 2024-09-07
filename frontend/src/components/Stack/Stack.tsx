import React from 'react';
import cn from 'classnames';
import {
  alignItemsClasses,
  directionClasses,
  justifyContentClasses,
  wrapClasses,
} from './classes';

interface StackProps {
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e:any)=>void;
}

const Stack: React.FC<StackProps> = ({
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'start',
  wrap = 'nowrap',
  gap = '',
  className = '',
  onClick,
  children,
}) => {
  const classes = cn(
    'flex',
    directionClasses[direction],
    alignItemsClasses[alignItems],
    justifyContentClasses[justifyContent],
    wrapClasses[wrap],
    gap && `gap-${gap}`,
    className,
  );

  return <div className={classes} onClick={onClick}>{children}</div>;
};

export default Stack;
