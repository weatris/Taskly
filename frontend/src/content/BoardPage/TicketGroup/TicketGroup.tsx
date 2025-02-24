import { t } from 'i18next';
import { Stack } from '../../../components/basic/Stack/Stack';
import { ButtonInputForm } from '../../BoardsPage/ButtonInputForm';
import { useApiMutation } from '../../../api/useApiMutation';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { useState } from 'react';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { DndItem } from '../../../components/basic/dnd/DndItem';
import { DndBucket } from '../../../components/basic/dnd/DndBucket';
import { TicketRowItem } from './TicketRowItem';
import { ticketGroupType } from '../../../common/typing';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { permissionControl } from '../../../utils/permissionControl';
import { GroupHeader } from './GroupHeader';

export const TicketGroup = ({ item }: { item: ticketGroupType }) => {
  const { boardData, userAccess } = useStateProvider().state.board;
  const { addNotification } = useNotification();
  const tickets = item.tickets || [];
  const invalidateQuery = useInvalidateQuery();
  const [isTicketDragged, setIsTicketDragged] = useState(false);

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

  const { mutate: mutateChangeTicketGroup } = useApiMutation(
    'changeTicketGroup',
    {
      onSuccess: () => {
        invalidateQuery('getBoardById');
      },
      onError: () => {
        addNotification({
          title: t('Groups.cantUpdate'),
          tp: 'alert',
        });
      },
    },
  );

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

  return (
    <DndBucket
      target="ticket"
      canAcceptItem={!isTicketDragged}
      onDrop={(id) => {
        if (item.tickets.map((itm) => itm.id).includes(id)) {
          return;
        }
        mutateChangeTicketGroup({
          id,
          groupId: item.groupId,
        });
      }}
    >
      <Stack className="w-[260px] h-full gap-2" direction="col">
        <GroupHeader {...{ item }} />
        <Stack
          className="w-full h-auto overflow-auto scrollbar-thin gap-2"
          direction="col"
        >
          {tickets.map((ticket, idx) => (
            <DndItem
              key={ticket.id}
              itemData={ticket.id}
              itemType="ticket"
              isDraggingCallback={(value) => {
                setIsTicketDragged(value);
              }}
            >
              <TicketRowItem
                {...{
                  ticket,
                  position:
                    idx == 0
                      ? tickets.length == 1
                        ? 'only'
                        : 'first'
                      : idx == tickets.length - 1
                        ? 'last'
                        : '',
                }}
              />
            </DndItem>
          ))}
        </Stack>
        {permissionControl({ userAccess, key: 'createTicket' }) &&
          !!item.groupId && (
            <ButtonInputForm
              {...{ onAccept: createTicket, text: t('Board.createTicket') }}
            />
          )}
      </Stack>
    </DndBucket>
  );
};
