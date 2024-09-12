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
  className?: string;
  style?: any;
  children: React.ReactNode;
  onClick?: (e: any) => void;
}

const Stack: React.FC<StackProps> = ({
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'start',
  wrap = 'nowrap',
  className = '',
  style,
  onClick,
  children,
}) => {
  const classes = cn(
    'flex',
    directionClasses[direction],
    alignItemsClasses[alignItems],
    justifyContentClasses[justifyContent],
    wrapClasses[wrap],
    className,
  );

  return (
    <div className={classes} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default Stack;
