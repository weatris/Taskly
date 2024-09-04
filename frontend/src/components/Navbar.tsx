import classNames from 'classnames';
import Stack from './Stack';
import { Icon } from '../images/Icon';
import { Bars3Icon } from '../images/icons';
import { HeaderStyle } from '../styles';

export const Navbar = () => {
  return (
    <Stack
      className="w-full h-[60px] border-b bg-gray-100 px-5 py-2"
      justifyContent="between"
      direction="row"
    >
      <Stack className="gap-x-2">
        <Icon className="hover:bg-gray-200">
          <Bars3Icon />
        </Icon>
        <p
          className={classNames(HeaderStyle, 'pb-1 text-gray-700 select-none')}
        >
          Task.ly
        </p>
      </Stack>

      <Stack>
        <Stack
          className="h-10 w-10 bg-gray-200 border border-gray-400 rounded-full"
          justifyContent="center"
        >
          <p className="mx-auto text-xl select-none">T</p>
        </Stack>
      </Stack>
    </Stack>
  );
};
