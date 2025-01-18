import { useNavigate, useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/useApiQuery';
import Stack from '../../components/Stack/Stack';
import { TicketMarkers } from './TicketMarkers';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { Button } from '../../components/Button';

export const BoardSettings = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { data, isLoading, isError } = useApiQuery('getBoardById', [{ id }], {
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
          <TicketMarkers />
        </Stack>
      </Stack>
    </ProgressPanel>
  );
};
