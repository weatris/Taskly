import { useState } from 'react';
import Stack from './Stack/Stack';
import classNames from 'classnames';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Stack
      className={classNames(
        'h-full border-r',
        isOpen ? 'w-[240px]' : 'w-[60px]',
      )}
      direction="col"
    >
      <></>
    </Stack>
  );
};
