import { useRef, useState } from 'react';
import { Icon } from '../images/Icon';
import { EllipsisHorizontalIcon } from '../images/icons';
import Stack from './Stack/Stack';
import { useClickAway } from 'react-use';
import classNames from 'classnames';

export type optionType = {
  text: string;
  onClick: () => void;
  classNames?: string;
};

export const Options = ({
  items,
  position = 'left',
}: {
  items: optionType[];
  position?: 'left' | 'right';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  if (items.length == 0) {
    return <></>;
  }

  return (
    <div ref={ref} className="relative">
      <Icon
        className={classNames(isOpen && 'border')}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <EllipsisHorizontalIcon color="gray" />
      </Icon>
      {isOpen && (
        <Stack
          className={classNames(
            'w-fit min-w-[120px] z-[2] py-1 bg-white rounded-lg border shadow-md absolute top-[28px]',
            position == 'right' ? 'left-0' : 'right-0',
          )}
          direction="col"
        >
          {items.map((item, idx) => {
            return (
              <Stack
                className={classNames(
                  'w-full h-[30px] px-2 text-nowrap hover:bg-gray-100 cursor-pointer',
                  idx !== 0 && 'border-t',
                  item.classNames,
                )}
                onClick={() => {
                  setIsOpen(false);
                  item.onClick();
                }}
              >
                {item.text}
              </Stack>
            );
          })}
        </Stack>
      )}
    </div>
  );
};
