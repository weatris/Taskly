import { useNavigate, useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/useApiQuery';
import Stack from '../../components/Stack/Stack';
import { Markers } from './Markers/TicketMarkers';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { Button } from '../../components/Button';
import { Members } from './Members/Members';
import { t } from 'i18next';
import { useStateProvider } from '../../stateProvider/useStateProvider';

export const BoardSettings = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { setBoardData } = useStateProvider().actions;

  const { data, isLoading, isError } = useApiQuery('getBoardById', [{ id }], {
    onSuccess: (data) => {
      setBoardData(data);
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
        <Stack
          className="w-full h-[60px] min-h-[60px] px-3 py-2 border-b"
          justifyContent="between"
        >
          <p>{data?.name}</p>
          <Stack className="gap-2" direction="row" alignItems="center">
            <Button
              {...{
                text: t('Board.settings.return'),
                variant: 'primary',
                onClick: () => {
                  navigate(`/boards/${data?.id}/${data?.name}`);
                },
              }}
            />
          </Stack>
        </Stack>
        <Stack className="w-full h-full" direction="row">
          <Markers />
          <div className="w-full h-full" />
          <Members {...{ data }} />
        </Stack>
      </Stack>
    </ProgressPanel>
  );
};
