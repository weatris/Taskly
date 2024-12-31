import { t } from 'i18next';
import Stack from '../../components/Stack/Stack';
import { ButtonInputForm } from '../BoardsPage/ButtonInputForm';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { useNavigate } from 'react-router-dom';
import { EditableName } from '../../components/EditableName';
import { useState } from 'react';
import { useInvalidateQuery } from '../../api/useInvalidateQuery';
import { DndItem } from '../../components/dnd/DndItem';
import { DndBucket } from '../../components/dnd/DndBucket';
import { TicketRowItem } from './TicketRowItem';

type ticketGroupType = {
  groupId: string;
  groupName: string;
  tickets: ticketType[];
};

export const TicketGroup = ({
  item,
  boardData,
}: {
  item: ticketGroupType;
  boardData: boardType;
}) => {
  const [value, setValue] = useState(item.groupName);
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
        title: t('Tickets.cantCreate'),
        tp: 'alert',
      });
    },
  });

  const createTicket = (name: string) => {
    mutateCreateTicket({
      id: boardData.id,
      groupId: item.groupId,
      name,
    });
  };

  const { mutate: mutateRenameGroup, isLoading: isLoadingRenameGroup } =
    useApiMutation('renameGroup', {
      onSuccess: () => {
        invalidateQuery('getBoardById');
      },
      onError: () => {
        addNotification({
          title: t('Groups.cantRename'),
          tp: 'alert',
        });
      },
    });

  const onGroupRename = (groupId: string, newValue: string) => {
    if (!boardData?.id || !newValue || !groupId) {
      return;
    }

    mutateRenameGroup({
      id: item.groupId,
      newValue,
    });
  };

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

  const handleSave = () => {
    if (item.groupName !== value) {
      onGroupRename?.(item.groupId, value);
    }
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
        <EditableName
          {...{
            value,
            setValue,
            initValue: value,
            isLoading: isLoadingRenameGroup,
            onClickAway: handleSave,
          }}
        />
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
        <ButtonInputForm
          {...{ onAccept: createTicket, text: t('Board.createTicket') }}
        />
      </Stack>
    </DndBucket>
  );
};
