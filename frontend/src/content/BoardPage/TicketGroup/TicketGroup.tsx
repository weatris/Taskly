import { t } from 'i18next';
import { Stack } from '../../../components/basic/Stack/Stack';
import { ButtonInputForm } from '../../BoardsPage/ButtonInputForm';
import { useApiMutation } from '../../../api/useApiMutation';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { DndItem } from '../../../components/basic/dnd/DndItem';
import { DndBucket } from '../../../components/basic/dnd/DndBucket';
import { TicketRowItem } from './TicketRowItem';
import { ticketGroupType, ticketType } from '../../../common/typing';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { permissionControl } from '../../../utils/permissionControl';
import { GroupHeader } from './GroupHeader';

export const TicketGroup = ({ item }: { item: ticketGroupType }) => {
  const { boardData, userAccess } = useStateProvider().state.board;
  const { addNotification } = useNotification();
  const tickets = item.tickets || [];
  const invalidateQuery = useInvalidateQuery();

  const { mutate: mutateCreateTicket } = useApiMutation('createTicket', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('Tickets.errors.cantCreate'),
        tp: 'alert',
      });
    },
  });

  const { mutate: mutateUpdateTicket } = useApiMutation('updateTicket', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('errors.cantUpdate'),
        tp: 'alert',
      });
    },
  });

  if (!boardData) {
    return <></>;
  }

  const createTicket = (name: string) => {
    mutateCreateTicket({
      id: boardData.id,
      groupId: item.groupId,
      name,
    });
  };

  const onDropTicket = (id: string, ticket?: ticketType, groupId?: string) => {
    if (ticket?.id == id) {
      return;
    }
    if (!!ticket && !ticket?.groupId) {
      return;
    }

    mutateUpdateTicket({
      id,
      targetId: ticket?.id || '',
      groupId: groupId || '',
    });
  };

  return (
    <Stack className="h-full gap-2" direction="col">
      <DndBucket
        target="ticket"
        className="!h-auto"
        canAcceptItem={!!item.groupId}
        onDrop={(id) => {
          onDropTicket(id, undefined, item.groupId);
        }}
      >
        <GroupHeader {...{ item }} />
      </DndBucket>
      <Stack
        className="w-full h-auto overflow-auto scrollbar-thin gap-2"
        direction="col"
      >
        {tickets.map((ticket) => (
          <DndBucket
            key={ticket.id}
            target="ticket"
            canAcceptItem={!!ticket.groupId}
            onDrop={(id) => {
              onDropTicket(id, ticket);
            }}
          >
            <DndItem itemData={ticket.id} itemType="ticket">
              <TicketRowItem
                {...{
                  ticket,
                }}
              />
            </DndItem>
          </DndBucket>
        ))}
      </Stack>
      {permissionControl({ userAccess, key: 'createTicket' }) &&
        !!item.groupId && (
          <ButtonInputForm
            {...{ onAccept: createTicket, text: t('Board.createTicket') }}
          />
        )}
    </Stack>
  );
};
