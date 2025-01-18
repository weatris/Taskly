import { useNavigate, useParams } from 'react-router-dom';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { Button } from '../../components/Button';
import { t } from 'i18next';
import { ButtonInputForm } from '../BoardsPage/ButtonInputForm';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { TicketGroup } from './TicketGroup';
import { OpenTicketModal } from './OpenTicketModal/OpenTicketModal';
import { useState } from 'react';
import { ShareBoardModal } from './ShareBoardModal';
import { useStateProvider } from '../../stateProvider/useStateProvider';

type ticketDataType = {
  groupId: string;
  groupName: string;
  tickets: ticketType[];
};

export const Board = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState<ticketDataType[]>([]);
  const { addNotification } = useNotification();
  const [showShareModal, setShowShareModal] = useState(false);
  const { setMarkers } = useStateProvider().actions;

  const { data, isLoading, isError, refetch } = useApiQuery(
    'getBoardById',
    [{ id }],
    {
      onSuccess: (data) => {
        const tickets = (data?.groups || []).map((group) => ({
          groupId: group.id,
          groupName: group.name,
          tickets: (
            data?.tickets.filter((ticket) => ticket.groupId === group.id) || []
          ).sort((a, b) => a.order - b.order),
        }));
        setTicketData(tickets);
      },
      onError: () => {
        addNotification({
          title: t('Board.cantLoad'),
          tp: 'alert',
        });
      },
    },
  );

  const {} = useApiQuery('getMarkers', [{ id }], {
    onSuccess: (data) => {
      setMarkers(data);
    },
  });

  const { mutate: mutateCreateGroup } = useApiMutation('createGroup', {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      addNotification({
        title: t('Groups.cantCreate'),
        tp: 'alert',
      });
    },
  });

  const onCreateNewGroup = (name: string) => {
    if (name) {
      mutateCreateGroup({
        id,
        name,
      });
    }
  };

  return (
    <>
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
                  text: t('Board.settings.title'),
                  variant: 'primary',
                  onClick: () => {
                    navigate('settings');
                  },
                }}
              />
              <Button
                {...{
                  text: t('Board.share'),
                  onClick: () => {
                    setShowShareModal(true);
                  },
                }}
              />
            </Stack>
          </Stack>
          {!!data && (
            <Stack
              className="w-full h-full overlow-x-auto p-4 gap-3"
              direction="row"
              alignItems="start"
              justifyContent="start"
            >
              <>
                {ticketData.map((item) => (
                  <TicketGroup
                    key={`${item.groupId}_${item.tickets.length}`}
                    {...{ item, boardData: data }}
                  />
                ))}
              </>
              <ButtonInputForm
                {...{ onAccept: onCreateNewGroup, text: t('Board.createList') }}
              />
            </Stack>
          )}
        </Stack>
        <OpenTicketModal />
      </ProgressPanel>
      <ShareBoardModal
        {...{
          show: showShareModal,
          onClose: () => {
            setShowShareModal(false);
          },
        }}
      />
    </>
  );
};
