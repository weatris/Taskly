import React from 'react';
import classNames from 'classnames';

interface StackProps {
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  className?: string;
  children: React.ReactNode;
}

const Stack: React.FC<StackProps> = ({
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'start',
  wrap = 'nowrap',
  className = '',
  children,
}) => {
  const classes = classNames(
    'flex',
    `flex-${direction}`,
    `items-${alignItems}`,
    `justify-${justifyContent}`,
    wrap !== 'nowrap' ? `flex-${wrap}` : '',
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Stack;
