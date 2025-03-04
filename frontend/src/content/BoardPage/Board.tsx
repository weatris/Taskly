import { useParams } from 'react-router-dom';
import { Stack } from '../../components/basic/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { t } from 'i18next';
import { ButtonInputForm } from '../BoardsPage/ButtonInputForm';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { TicketGroup } from './TicketGroup/TicketGroup';
import { OpenTicketModal } from './OpenTicketModal/OpenTicketModal';
import { useState } from 'react';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { ticketType } from '../../common/typing';
import { permissionControl } from '../../utils/permissionControl';
import { Header } from './Header';

type ticketDataType = {
  groupId: string;
  groupName: string;
  tickets: ticketType[];
};

export const Board = () => {
  const { id = '' } = useParams();
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
        const extraGroups = data.tickets.filter((item) => !item.groupId).length
          ? [{ id: '', name: t('Groups.ungrouped') }]
          : [];
        const tickets = [...extraGroups, ...(data?.groups || [])].map(
          (group) => ({
            groupId: group.id,
            groupName: group.name,
            tickets: (
              data?.tickets.filter((ticket) => ticket.groupId === group.id) ||
              []
            ).sort((a, b) => a.order - b.order),
          }),
        );
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
        <Header />
        {!!data && (
          <Stack className="w-full h-full relative px-2 pb-4">
            <Stack
              className="w-full h-full absolute top-0 bottom-0 right-0 left-0 overlow-x-auto overflow-y-hidden scrollbar-thin p-4 gap-3"
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
              {permissionControl({ userAccess, key: 'boardCreateGroup' }) && (
                <ButtonInputForm
                  {...{
                    onAccept: onCreateNewGroup,
                    text: t('Groups.createGroup'),
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
