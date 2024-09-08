import Stack from './Stack/Stack';
import classNames from 'classnames';
import { useStateProvider } from '../stateProvider/useStateProvider';
import { t } from 'i18next';
import { BookOpenIcon, CalendarIcon, ClipboardIcon } from '../images/icons';
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
  const location = useLocation();  // Get current path

  const routes: routeType[] = [
    {
      title: t('WorkPlaces'),
      icon: <BookOpenIcon color="grey" />,
      path: '/workplaces',
    },
    {
      title: t('Boards'),
      icon: <ClipboardIcon color="grey" />,
      path: '/boards',
    },
    {
      title: t('Calendar'),
      icon: <CalendarIcon color="grey" />,
      path: '/calendar',
    },
  ];

  return (
    <Stack
      className={classNames(
        'h-full border-r py-2 gap-2',
        isFull ? 'w-[280px]' : 'w-[70px]',
      )}
      direction="col"
    >
      {routes.map((item) => (
        <Stack
          key={item.path}
          direction="row"
          alignItems="center"
          className={classNames(
            'w-full pl-5 px-2 py-2 gap-1 cursor-pointer border-t border-b',
            location.pathname.startsWith(item.path) ? 'bg-gray-100' : 'hover:bg-gray-50',
            isFull && '',
          )}
          onClick={() => {
            navigate(item.path);
          }}
        >
          <Icon hoverable={false}>{item.icon}</Icon>
          {isFull && <p className="text-lg">{item.title}</p>}
        </Stack>
      ))}
    </Stack>
  );
};
