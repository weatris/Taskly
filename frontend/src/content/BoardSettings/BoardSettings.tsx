import { useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/useApiQuery';
import { Stack } from '../../components/basic/Stack/Stack';
import { Markers } from './Markers/TicketMarkers';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { Members } from './Members/Members';
import { t } from 'i18next';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Toolbar } from './Toolbar';
import { BoardManagement } from './BoardManagement';
import { useScreenDetector } from '../../utils/useScreenDetector';
import { useState } from 'react';
import classNames from 'classnames';

export const BoardSettings = () => {
  const { id = '' } = useParams();
  const { addNotification } = useNotification();
  const { state, actions } = useStateProvider();
  const { id: userId } = state.auth;
  const { setBoardData, setUserAccess } = actions;
  const { isTablet } = useScreenDetector();

  const { isLoading, isError } = useApiQuery('getBoardById', [{ id }], {
    onSuccess: (data) => {
      setBoardData(data);
      const role =
        data.members.find((item) => item.id === userId)?.level || 'guest';
      setUserAccess({
        accessLevel: role,
      });
    },
    onError: () => {
      addNotification({
        title: t('Board.cantLoad'),
        tp: 'alert',
      });
    },
  });

  return (
    <ProgressPanel {...{ isLoading, isError }}>
      <Stack className="w-full h-full" direction="col">
        <Toolbar />
        {isTablet ? <MobileLayout /> : <DesktopLayout />}
      </Stack>
    </ProgressPanel>
  );
};

const DesktopLayout = () => {
  return (
    <Stack className="w-full h-full overflow-hidden" direction="row">
      <Markers />
      <BoardManagement />
      <div className="w-full h-full" />
      <Members />
    </Stack>
  );
};

const mapping = {
  markers: <Markers />,
  members: <Members />,
  boardManagement: <BoardManagement />,
};
const tabs = Object.keys(mapping) as (keyof typeof mapping)[];

const MobileLayout = () => {
  const [currentTab, setCurrentTab] = useState<keyof typeof mapping>('markers');

  return (
    <Stack className="w-full h-full overflow-hidden" direction="col">
      <Stack className="w-full" direction="row">
        {tabs.map((item) => (
          <Stack
            key={item}
            className={classNames(
              'w-full h-[40px] px-4 border overflow-hidden',
              item === currentTab && 'bg-gray-100',
            )}
            onClick={() => {
              setCurrentTab(item);
            }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <p className="truncate">{t(`Board.settings.${item}.header`)}</p>
          </Stack>
        ))}
      </Stack>
      <Stack
        className="w-full h-full overflow-auto [&>div]:w-full"
        direction="row"
      >
        {mapping[currentTab]}
      </Stack>
    </Stack>
  );
};
