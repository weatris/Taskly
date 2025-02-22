import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../../components/Modal';
import Stack from '../../../components/Stack/Stack';
import { useApiQuery } from '../../../api/useApiQuery';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { Description } from './Description';
import { Title } from './Title';
import { Chat } from '../../../components/Chat/Chat';
import { TicketDetails } from './TicketDetails';
import { useStateProvider } from '../../../stateProvider/useStateProvider';

export const OpenTicketModal = () => {
  const { id = '', boardName = '', ticketId = '' } = useParams();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const { state, actions } = useStateProvider();
  const { userAccess } = state.board;
  const { setOpenTicketData } = actions;

  const { data, isLoading, refetch } = useApiQuery(
    'getTicketById',
    [{ id: ticketId }],
    {
      enabled: !!ticketId,
      onSuccess: (data) => {
        setOpenTicketData(data);
      },
      onError: () => {
        addNotification({
          title: t('Tickets.errors.cantLoadError'),
          tp: 'alert',
        });
        navigate(`/boards/${id}/${boardName}`);
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
          setOpenTicketData(undefined);
        },
        titleClasssnames: 'h-[80px]',
      }}
    >
      <ProgressPanel {...{ isLoading }}>
        <Stack className="w-full h-full gap-1" direction="row">
          <Stack className="w-full h-full relative" direction="col">
            <Stack
              className="w-full h-full gap-2 absolute top-0 bottom-0"
              direction="col"
            >
              <Stack
                className="w-full h-full max-h-[50%] border-[1px]"
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
              </Stack>
              <Stack className="w-full h-full max-h-[50%] border-[1px]">
                <Chat {...{ ticketId, boardId: id }} />
              </Stack>
            </Stack>
          </Stack>
          <TicketDetails {...{ data }} />
        </Stack>
      </ProgressPanel>
    </Modal>
  );
};
