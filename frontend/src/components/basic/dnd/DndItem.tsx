import { useEffect } from 'react';
import { useDrag } from 'react-dnd';

export const DndItem = ({
  itemType,
  itemData,
  children,
  isDraggingCallback,
}: {
  itemType: string;
  itemData: string;
  children: React.ReactNode;
  isDraggingCallback?: (isDrag: boolean) => void;
}) => {
  const [{ opacity, isDragging }, dragRef] = useDrag(
    () => ({
      type: itemType,
      item: { id: itemData },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

  useEffect(() => {
    isDraggingCallback?.(isDragging);
  }, [isDragging]);

  return (
    <div ref={dragRef} className="w-full" style={{ opacity }}>
      {children}
    </div>
  );
};
