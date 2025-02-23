import { Stack } from '../Stack/Stack';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { Button } from '../Button';
import { useApiMutation } from '../../api/useApiMutation';
import { useEffect, useState } from 'react';
import { useApiInfiniteQuery } from '../../api/useApiInfiniteQuery';
import { Virtuoso } from 'react-virtuoso';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { chatMessageType } from '../../common/typing';
import { permissionControl } from '../../utils/permissionControl';

//finish it
export const Chat = ({
  ticketId,
  boardId,
}: {
  ticketId: string;
  boardId: string;
}) => {
  const { addNotification } = useNotification();
  const [message, setMessage] = useState('');
  const { state } = useStateProvider();
  const { id, name } = state.auth;
  const { userAccess } = state.board;
  const [messages, setMessages] = useState<chatMessageType[]>([]);

  const queryParams = useApiInfiniteQuery(
    'getTicketChatDataById',
    [{ id: ticketId }],
    {
      enabled: !!ticketId,
      direction: 'start',
      onSuccess: () => {
        console.log('onSuccess');
      },
      onError: () => {
        addNotification({
          title: t('Tickets.errors.cantLoadChatError'),
          tp: 'alert',
        });
      },
    },
  );

  const { mutate } = useApiMutation('createTicketChatMessage', {
    onSuccess: () => {
      setMessage('');
    },
    onError: () => {
      addNotification({
        title: t('Tickets.errors.cantLoadChatError'),
        tp: 'alert',
      });
    },
  });

  const sendMessage = () => {
    const newMessage = {
      content: message,
      ticketId,
      boardId,
      isLoading: true,
      user: {
        id,
        name,
      },
    } as chatMessageType;

    setMessages((prev) => [...prev, newMessage]);
    mutate({ id: ticketId, message, boardId });
  };

  const { isFetching, isFetched, loadNext } = queryParams;

  const renderItem = (_: number, item: chatMessageType) => {
    return (
      <>
        {item.content} {item.isLoading && 'tester'}
      </>
    );
  };

  const atTopStateChange = () => {
    !isFetching && loadNext();
  };

  useEffect(() => {
    setMessages(queryParams.data.data);
  }, [isFetched, isFetching, queryParams.data.data.length]);

  return (
    <Stack className="w-full h-full" direction="col">
      <Virtuoso
        data={messages}
        followOutput={'smooth'}
        initialTopMostItemIndex={99999}
        atTopStateChange={atTopStateChange}
        itemContent={renderItem}
        style={{
          height: '100%',
          width: '100%',
          flex: '1 1 auto',
          overscrollBehavior: 'contain',
        }}
      />
      {permissionControl({ userAccess, key: 'boardChatWrite' }) && (
        <Stack
          className="w-full max-h-[80px] h-[80px] border-t-[1px] gap-3 p-3"
          direction="row"
        >
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value || '');
            }}
            className="w-full h-full rounded-lg border indent-2 focus:outline-none"
          />
          <Button
            {...{
              text: 'Send',
              onClick: sendMessage,
              disabled: !message,
            }}
          />
        </Stack>
      )}
    </Stack>
  );
};
