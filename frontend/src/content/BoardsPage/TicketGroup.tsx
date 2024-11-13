import { t } from 'i18next';
import Stack from '../../components/Stack/Stack';
import { ButtonInputForm } from './ButtonInputForm';
import { Icon } from '../../images/Icon';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { Input } from '../../components/Input';
import { useClickAway } from 'react-use';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { Spinner } from '../../components/Spinner';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { EditableName } from '../../components/EditableName';

type ticketGroupType = {
  groupId: string;
  groupName: string;
  tickets: ticketType[];
};

export const TicketGroup = ({
  item,
  boardData,
  refetch,
}: {
  item: ticketGroupType;
  boardData: boardType;
  refetch: () => void;
}) => {
  const [value, setValue] = useState(item.groupName);
  const { addNotification } = useNotification();
  const tickets = item.tickets || [];
  const navigate = useNavigate();

  const { mutate: mutateCreateTicket } = useApiMutation('createTicket', {
    onSuccess: () => {
      refetch();
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
        refetch();
      },
      onError: () => {
        addNotification({
          title: t('Groups.cantRename'),
          tp: 'alert',
        });
      },
    });

  const onGroupRename = (groupId: string, newName: string) => {
    if (!boardData?.id || !newName || !groupId) {
      return;
    }

    mutateRenameGroup({
      id: item.groupId,
      newName,
    });
  };

  const handleSave = () => {
    if (item.groupName !== value) {
      onGroupRename?.(item.groupId, value);
    }
  };

  return (
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
      {tickets.map((ticket) => (
        <Stack
          key={ticket.id}
          className="w-full min-h-[40px] bg-white rounded-lg border cursor-pointer hover:border-gray-400"
          direction="col"
          alignItems="start"
          onClick={() => {
            navigate(`tickets/${ticket.id}`);
          }}
        >
          <p className="leading-[40px] px-2">{ticket.name}</p>
        </Stack>
      ))}
      <ButtonInputForm
        {...{ onAccept: createTicket, text: t('Board.createTicket') }}
      />
    </Stack>
  );
};
