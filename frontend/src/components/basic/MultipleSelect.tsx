import { useRef, useState } from 'react';
import { Stack } from './Stack/Stack';
import { Icon } from '../../images/Icon';
import { ChevronUpIcon, ChevronDownIcon } from '../../images/icons';
import { Checkbox } from './Checkbox';
import { useClickAway } from 'react-use';

export const MultipleSelect = ({
  items,
  selected,
  onSelect,
  children,
  placeholder,
}: {
  items: { id: string; name: string }[];
  selected: string[];
  onSelect: (id: string) => void;
  children: React.ReactNode;
  placeholder: string;
}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className="w-full flex flex-col">
      <Stack
        className="w-full min-h-[40px] p-2 border rounded-lg cursor-pointer shadow-sm"
        direction="row"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <Stack className="w-full">
          <>{selected.length ? children : <p>{placeholder}</p>}</>
        </Stack>
        <Icon>
          {isOpen ? (
            <ChevronUpIcon color="gray" />
          ) : (
            <ChevronDownIcon color="gray" />
          )}
        </Icon>
      </Stack>
      <div className="w-full relative">
        {isOpen && (
          <Stack
            className="w-full h-fit max-h-[300px] absolute top-0 p-2 gap-1 bg-white shadow-sm border rounded-lg"
            direction="col"
            alignItems="start"
          >
            {items.map((item) => (
              <Stack
                className="w-full gap-1 cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  onSelect(item.id);
                }}
              >
                <Checkbox
                  value={selected.includes(item.id)}
                  onClick={() => {}}
                />
                <p>{item.name}</p>
              </Stack>
            ))}
          </Stack>
        )}
      </div>
    </div>
  );
};
