import React from 'react';
import { useDrop } from 'react-dnd';

export const DndBucket = ({
  target,
  children,
  canAcceptItem,
  onDrop,
}: {
  target: string;
  children: React.ReactNode;
  canAcceptItem?: boolean;
  onDrop: (id: string) => void;
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
      className="h-full"
      ref={drop}
      style={{
        boxShadow: isOver && canAcceptItem ? '0px 1px 2px gray' : 'none',
      }}
    >
      {children}
    </div>
  );
};
