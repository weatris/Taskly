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
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { ticketType } from '../../common/typing';
import { permissionControl } from '../../utils/permissionControl';
import { ShareBoardButton } from '../../components/ShareBoardButton';

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
  const { state, actions } = useStateProvider();
  const { id: userId } = state.auth;
  const { userAccess } = state.board;
  const { setMarkers, setBoardData, setUserAccess } = actions;

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
    <ProgressPanel {...{ isLoading, isError }}>
      <Stack className="w-full h-full" direction="col">
        <Stack
          className="w-full h-[60px] min-h-[60px] px-3 py-2 border-b-[2px]"
          justifyContent="between"
        >
          <p>{data?.name}</p>
          <Stack className="gap-2" direction="row">
            <ShareBoardButton {...{ id, userAccess }} />
            <Button
              {...{
                text: t('Board.settings.title'),
                variant: 'primary',
                onClick: () => {
                  navigate('settings');
                },
              }}
            />
          </Stack>
        </Stack>
        {!!data && (
          <Stack className="w-full h-full px-2 pb-4">
            <Stack
              className="w-full h-full overlow-x-auto overflow-y-hidden scrollbar-thin p-4 gap-3"
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
              {permissionControl({ userAccess, key: 'boardCreateList' }) && (
                <ButtonInputForm
                  {...{
                    onAccept: onCreateNewGroup,
                    text: t('Board.createList'),
                  }}
                />
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
      <OpenTicketModal />
    </ProgressPanel>
  );
};
