import { useState } from 'react';
import { Stack } from './Stack/Stack';
import { Icon } from '../../images/Icon';
import { ChevronDownIcon, ChevronUpIcon } from '../../images/icons';

export const Accordion = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack className="w-full" direction="col" alignItems="start">
      <Stack
        className="w-full p-3 border rounded-md cursor-pointer"
        alignItems="center"
        justifyContent="between"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <p className="truncate">{title}</p>
        <Icon>
          {isOpen ? (
            <ChevronUpIcon color="gray" />
          ) : (
            <ChevronDownIcon color="gray" />
          )}
        </Icon>
      </Stack>
      {isOpen && (
        <Stack className="w-full py-2" direction="col">
          {children}
        </Stack>
      )}
    </Stack>
  );
};
