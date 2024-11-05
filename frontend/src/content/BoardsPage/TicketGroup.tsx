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
  const [showEditName, setShowEditName] = useState(false);
  const [value, setValue] = useState(item.groupName);
  const ref = useRef(null);
  const { addNotification } = useNotification();
  const tickets = item.tickets || [];
  const navigate = useNavigate();

  const { mutate: mutateCreateTicket } = useApiMutation('createTicket', {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      addNotification({
        title: t('Errors.default'),
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
          title: t('Errors.default'),
          tp: 'alert',
        });
      },
    });

  const onGroupRename = (groupId: string, newName: string) => {
    if (!boardData?.id || !newName || !groupId) {
      return;
    }

    mutateRenameGroup({
      id: boardData.id,
      newName
    });
  };

  const handleSave = ()=>{
    setShowEditName(false);
    if (item.groupName !== value) {
      onGroupRename?.(item.groupId, value);
    }
  }

  useClickAway(ref, () => {
    handleSave();
  });

  return (
    <Stack className="w-[260px] h-full gap-2" direction="col">
      <div
        ref={ref}
        className="w-[260px] h-[40px] flex flex-col bg-gray-200 rounded-lg border shadow-md gap-2"
      >
        {showEditName ? (
        <Stack className='w-full h-full gap-1'>
          <Input {...{ value, setValue }} />
          {value!== item.groupName&&<Button {...{text:'+', className:'px-0', onClick: ()=>{
            handleSave();
          }}}/>}
          </Stack>
        ) : (
          <Stack
            className="w-full px-2 pb-2"
            direction="row"
            alignItems="center"
            justifyContent="between"
          >
            <p
              className={classNames(
                'leading-[40px] truncate',
                isLoadingRenameGroup && 'invisible',
              )}
            >
              {item.groupName}
            </p>
            <Icon
              size="md"
              onClick={() => {
                setShowEditName(true);
              }}
            >
              {isLoadingRenameGroup ? (
                <>
                  <Spinner />
                </>
              ) : (
                <PencilIcon color="gray" />
              )}
            </Icon>
          </Stack>
        )}
      </div>
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
          {ticket.id == '1' && (
            <div className="w-full h-[20px] rounded-t-lg bg-red-200" />
          )}
          <p className="leading-[40px] px-2">{ticket.name}</p>
        </Stack>
      ))}
      <ButtonInputForm
        {...{ onAccept: createTicket, text: t('Board.createTicket') }}
      />
    </Stack>
  );
};
