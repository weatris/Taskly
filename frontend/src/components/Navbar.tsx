import classNames from 'classnames';
import Stack from './Stack/Stack';
import { Icon } from '../images/Icon';
import { Bars3Icon } from '../images/icons';
import { HeaderStyle } from '../styles';
import { useNavigate } from 'react-router-dom';

import { t } from 'i18next';

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Stack
      className="w-full h-[60px] border-b bg-gray-50 px-5 py-2"
      justifyContent="between"
      direction="row"
    >
      <Stack className="gap-x-2">
        <Icon>
          <Bars3Icon />
        </Icon>
        <p
          className={classNames(HeaderStyle, 'pb-1 text-gray-700 select-none cursor-pointer')}
          onClick={()=>{
            navigate('/')
          }}
        >
        {t('appName')}
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
