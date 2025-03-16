import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';

export const DndBucket = ({
  target,
  children,
  canAcceptItem,
  onDrop,
  className,
}: {
  target: string;
  children: React.ReactNode;
  canAcceptItem?: boolean;
  onDrop: (id: string) => void;
  className?: string;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: target,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: { id: string }) => {
      onDrop(item.id);
    },
  }));

  return (
    <div
      className={classNames('w-full h-full', className)}
      ref={drop}
      style={{
        boxShadow: isOver && canAcceptItem ? '0px 1px 2px gray' : 'none',
      }}
    >
      {children}
    </div>
  );
};
