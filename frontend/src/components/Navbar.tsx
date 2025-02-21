import classNames from 'classnames';
import Stack from './Stack/Stack';
import { Icon } from '../images/Icon';
import { Bars3Icon } from '../images/icons';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useStateProvider } from '../stateProvider/useStateProvider';
import { Dropdown, dropdownItemType } from './Dropdown';
import { HeaderStyle } from '../common/styles';

export const Navbar = () => {
  const navigate = useNavigate();
  const { state, actions } = useStateProvider();
  const { isFull } = state.config;
  const { toggleSidebar } = actions;

  const items: dropdownItemType[] = [
    {
      content: <p className="text-red-500">{t('manageUser.LogOut')}</p>,
      onClick: () => {
        localStorage.removeItem('authData');
        window.location.reload();
      },
    },
  ];

  return (
    <Stack
      className="w-full !h-[60px] border-b bg-gray-50 px-5 py-2"
      justifyContent="between"
      direction="row"
    >
      <Stack className="gap-x-2">
        <Icon
          onClick={() => {
            navigate('/');
          }}
        >
          <Bars3Icon />
        </Icon>
        <p
          className={classNames(
            HeaderStyle,
            'pb-1 text-gray-700 select-none cursor-pointer',
          )}
          onClick={() => {
            navigate('/');
          }}
        >
          {t('appName')}
        </p>
      </Stack>

      <Dropdown
        label={
          <Stack
            className="h-10 w-10 bg-gray-200 border border-gray-400 rounded-full"
            justifyContent="center"
          >
            <p className="mx-auto text-xl select-none">T</p>
          </Stack>
        }
        items={items}
      />
    </Stack>
  );
};
