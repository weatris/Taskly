import Stack from './Stack/Stack';
import classNames from 'classnames';
import { useStateProvider } from '../stateProvider/useStateProvider';
import { t } from 'i18next';
import {
  BookOpenIcon,
  CalendarIcon,
  ClipboardIcon,
  HomeIcon,
} from '../images/icons';
import { Icon } from '../images/Icon';
import { useNavigate, useLocation } from 'react-router-dom';

type routeType = {
  title: string;
  icon: React.ReactNode;
  path: string;
};

export const Sidebar = () => {
  const { isFull } = useStateProvider().state.config;
  const navigate = useNavigate();
  const location = useLocation();

  const routes: routeType[] = [
    {
      title: t('sidebar.Dashboard'),
      icon: <HomeIcon color="grey" />,
      path: '/',
    },
    {
      title: t('sidebar.WorkPlaces'),
      icon: <BookOpenIcon color="grey" />,
      path: '/workplaces',
    },
    {
      title: t('sidebar.Boards'),
      icon: <ClipboardIcon color="grey" />,
      path: '/boards',
    },
    {
      title: t('sidebar.Calendar'),
      icon: <CalendarIcon color="grey" />,
      path: '/calendar',
    },
  ];

  return (
    <Stack
      className={classNames(
        'h-full border-r py-2 gap-2',
        isFull ? 'w-[280px] min-w-[280px]' : 'w-[70px] min-w-[70px]',
      )}
      direction="col"
    >
      {routes.map((item) => {
        const isActive =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);

        return (
          <Stack
            key={item.path}
            direction="row"
            alignItems="center"
            className={classNames(
              'w-full pl-5 px-2 py-2 gap-1 cursor-pointer border-t border-b',
              isActive ? 'bg-gray-100' : 'hover:bg-gray-50',
            )}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <Icon hoverable={false}>{item.icon}</Icon>
            {isFull && <p className="text-lg">{item.title}</p>}
          </Stack>
        );
      })}
    </Stack>
  );
};
