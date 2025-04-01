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
import { useEffect, useState } from 'react';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { boardType, ticketType } from '../../common/typing';
import { permissionControl } from '../../utils/permissionControl';
import { Header } from './Header';

type ticketDataType = {
  groupId: string;
  groupName: string;
  tickets: ticketType[];
};

export const Board = () => {
  const { id = '', boardName = '', ticketId = '' } = useParams();
  const [ticketData, setTicketData] = useState<ticketDataType[]>([]);
  const { addNotification } = useNotification();
  const { state, actions } = useStateProvider();
  const { id: userId } = state.auth;
  const { userAccess } = state.board;
  const { filterMarkers, filterMembers } = state.ticket;
  const { setMarkers, setBoardData, setUserAccess } = actions;

  const filterTickets = (dataData: boardType) => {
    const extraGroups = dataData.tickets.filter((item) => !item.groupId).length
      ? [{ id: '', name: t('Groups.ungrouped') }]
      : [];

    type FilterKey = 'assignedTo' | 'markers';
    const filterParams: { value: string[]; key: FilterKey }[] = [
      { value: filterMembers || [], key: 'assignedTo' },
      { value: filterMarkers || [], key: 'markers' },
    ];

    const filteredTickets = filterParams.every(
      (filterItem) => !filterItem.value.length,
    )
      ? dataData.tickets
      : dataData.tickets?.filter((item) =>
          filterParams.some((filterItem) => {
            const itemValue = item[filterItem.key] || [];

            if (
              filterItem.value.length &&
              filterItem.value.some((id) => !id) &&
              !itemValue.length
            ) {
              return true;
            }

            return itemValue.some((id) => filterItem.value.includes(id));
          }),
        );

    const tickets = [...extraGroups, ...(data?.groups || [])].map((group) => ({
      groupId: group.id,
      groupName: group.name,
      tickets: filteredTickets
        .filter((ticket) => ticket.groupId === group.id)
        .sort((a, b) => a.order - b.order),
    }));

    setTicketData(tickets);
  };

  const { data, isLoading, isError, refetch } = useApiQuery(
    'getBoardById',
    [{ id }],
    {
      onSuccess: (data) => {
        filterTickets(data);
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

  useEffect(() => {
    data && filterTickets(data);
  }, [
    isLoading,
    data?.groups.length,
    filterMarkers?.length,
    filterMembers?.length,
  ]);

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
                    key={`${item.groupId}_${item.groupName}_${item.tickets.length}`}
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
      {!!ticketId && <OpenTicketModal />}
    </ProgressPanel>
  );
};
