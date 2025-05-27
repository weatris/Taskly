import classNames from 'classnames';
import { Stack } from './basic/Stack/Stack';
import { Icon } from '../images/Icon';
import { Bars3Icon } from '../images/icons';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { Dropdown, dropdownItemType } from './basic/Dropdown';
import { HeaderStyle } from '../common/styles';
import { useStateProvider } from '../stateProvider/useStateProvider';
import { Avatar } from './basic/Avatar';

export const Navbar = () => {
  const navigate = useNavigate();
  const { state } = useStateProvider();

  const items: dropdownItemType[] = [
    {
      content: <p data-testid={'manageUser'}>{t('manageUser.title')}</p>,
      onClick: () => {
        navigate('/user');
      },
    },
    {
      content: <p data-testid={'manageUserLogOut'} className="text-red-500">{t('manageUser.LogOut')}</p>,
      onClick: () => {
        localStorage.removeItem('authData');
        window.location.reload();
      },
    },
  ];

  return (
    <Stack
      dataTestId="Navbar"
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
        label={<Avatar dataTestId='AvatarDropdown' {...{ userData: state.auth, canHover: false }} />}
        items={items}
      />
    </Stack>
  );
};
