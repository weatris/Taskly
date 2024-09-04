import { useState } from 'react';
import Stack from './Stack';
import classNames from 'classnames';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Stack
      className={classNames('h-full border', isOpen ? 'w-[200px]' : 'w-[60px]')}
      direction="col"
    >
      <></>
    </Stack>
  );
};
