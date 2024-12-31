import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../../components/Modal';
import Stack from '../../../components/Stack/Stack';
import { useApiQuery } from '../../../api/useApiQuery';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { Description } from './Description';
import { Title } from './Title';
import { Chat } from './Chat';

export const OpenTicketModal = () => {
  const { id = '', boardName = '', ticketId = '' } = useParams();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useApiQuery(
    'getTicketById',
    [{ id: ticketId }],
    {
      enabled: !!ticketId,
      onError: () => {
        addNotification({
          title: t('Tickets.cantLoadError'),
          tp: 'alert',
        });
        navigate(`/boards/${id}`);
      },
    },
  );

  return (
    <Modal
      {...{
        isVisible: !!ticketId,
        title: <Title {...{ data }} />,
        modalType: 'info',
        onClose: () => {
          navigate(`/boards/${id}/${boardName}`);
        },
        titleClasssnames: 'h-[80px]',
      }}
    >
      <ProgressPanel {...{ isLoading }}>
        <Stack className="w-full h-full gap-1" direction="row">
          <Stack className="w-full h-full gap-2" direction="col">
            <Stack
              className="w-full h-full relative border-[1px] overflow-auto"
              direction="col"
            >
              <Description
                {...{
                  data,
                  refetch: () => {
                    refetch();
                  },
                }}
              />
              <Chat {...{ id }} />
            </Stack>
          </Stack>
          <Stack
            className="w-[400px] !min-w-[400px] !max-w-[400px] h-full p-2 border-[1px]"
            direction="col"
            alignItems="start"
          >
            <Stack
              className="w-full h-fit p-1 rounded-md border-b"
              direction="row"
              alignItems="center"
            >
              <p className="truncate">
                {t('Tickets.groupBtn')} {data?.groupName}
              </p>
            </Stack>
          </Stack>
        </Stack>
      </ProgressPanel>
    </Modal>
  );
};
