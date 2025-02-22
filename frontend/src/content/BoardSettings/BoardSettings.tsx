import { useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/useApiQuery';
import Stack from '../../components/Stack/Stack';
import { Markers } from './Markers/TicketMarkers';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { Members } from './Members/Members';
import { t } from 'i18next';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Toolbar } from './Toolbar';
import { BoardManagement } from './BoardManagement';

export const BoardSettings = () => {
  const { id = '' } = useParams();
  const { addNotification } = useNotification();
  const { state, actions } = useStateProvider();
  const { id: userId } = state.auth;
  const { setBoardData, setUserAccess } = actions;

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
        <Stack className="w-full h-full" direction="row">
          <Markers />
          <BoardManagement />
          <div className="w-full h-full" />
          <Members />
        </Stack>
      </Stack>
    </ProgressPanel>
  );
};
