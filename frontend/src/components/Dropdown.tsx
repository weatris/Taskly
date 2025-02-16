import classNames from 'classnames';
import { useRef, useState } from 'react';
import Stack from './Stack/Stack';
import { useClickAway } from 'react-use';

export type dropdownItemType = {
  content: string | React.ReactNode;
  onClick?: () => void;
};

export const Dropdown = ({
  label,
  items,
}: {
  label: React.ReactNode;
  items: dropdownItemType[];
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setShowDropdown(false);
  });

  return (
    <Stack
      direction="col"
      alignItems="end"
      onClick={() => {
        setShowDropdown((prev) => !prev);
      }}
    >
      <div className="cursor-pointer">{label}</div>
      <div className="relative" ref={ref}>
        {showDropdown && (
          <div className="w-[200px] overflow-hidden bg-white border rounded-md z-[2] absolute top-0 right-0 shadow-sm">
            {items.map((item, idx) => (
              <Stack
                key={idx}
                onClick={item.onClick}
                className={classNames(
                  'h-[40px] pl-2 cursor-pointer hover:bg-gray-50',
                  idx !== items.length - 1 && 'border-b',
                )}
              >
                {item.content}
              </Stack>
            ))}
          </div>
        )}
      </div>
    </Stack>
  );
};
