import { Stack } from '../basic/Stack/Stack';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { Button } from '../basic/Button';
import { useApiMutation } from '../../api/useApiMutation';
import { useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { chatMessageType } from '../../common/typing';
import { permissionControl } from '../../utils/permissionControl';
import { useApiInfiniteQuery } from '../../api/useApiInfiniteQuery';
import { generateId } from '../../utils/generateId';
import { useSocket } from '../../api/useSocket';
import { ProgressPanel } from '../StatePanels/ProgressPanel';
import classNames from 'classnames';
import { useScreenDetector } from '../../utils/useScreenDetector';

export const Chat = ({
  chatId,
  ticketId,
  boardId,
  renderItem,
}: {
  chatId: string;
  ticketId: string;
  boardId: string;
  renderItem: (message: chatMessageType) => React.ReactNode;
}) => {
  const { addNotification } = useNotification();
  const [message, setMessage] = useState('');
  const { state } = useStateProvider();
  const { userAccess } = state.board;
  const { id, name, email } = state.auth;

  const { socket } = useSocket({ id: chatId });
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [messages, setMessages] = useState<chatMessageType[]>([]);

  const setFilteredMessages = (data: chatMessageType[]) => {
    setMessages(
      Array.from(new Map(data.map((item) => [item.id, item])).values()),
    );
  };

  const { loadNext, isLoading } = useApiInfiniteQuery(
    'getChatData',
    [{ ticketId, boardId, chatId }],
    {
      enabled: !!chatId,
      direction: 'start',
      onSuccessCallback: (data) => {
        setFilteredMessages(data.data);
        setFirstItemIndex(() => firstItemIndex - (data.meta?.pageSize || 0));
      },
      onError: () => {
        addNotification({
          title: t('chat.cantLoadError'),
          tp: 'alert',
        });
      },
      refetchOnMount: true,
    },
  );

  const { mutate: getMessage } = useApiMutation('getChatMessageById', {
    onSuccess: (data) => {
      setFilteredMessages([...messages, data]);
    },
  });

  const { mutate } = useApiMutation('createChatMessage', {
    onSuccess: () => {
      setMessage('');
    },
    onError: () => {
      addNotification({
        title: t('chat.cantLoadError'),
        tp: 'alert',
      });
    },
  });

  const sendMessage = () => {
    if (!message.trim()) {
      setMessage('');
      return;
    }

    const messageId = generateId(10);
    const newMessage = {
      id: messageId,
      content: message,
      ticketId,
      boardId,
      isLoading: true,
      user: {
        id,
        name,
        email,
      },
    } as chatMessageType;

    setMessages((prev) => [...prev, newMessage]);
    mutate({ ticketId, boardId, message, messageId });
  };

  const loadNextPage = () => {
    !isLoading && loadNext();
  };

  useEffect(() => {
    socket?.on('send_message', (id) => {
      getMessage(id);
    });
    return () => {
      console.log('closing chat');
      setMessages([]);
    };
  }, [socket]);

  const { isSmallTablet } = useScreenDetector();

  return (
    <ProgressPanel isLoading={isLoading && !messages.length}>
      <Stack className="w-full h-full" direction="col">
        <Virtuoso
          ref={virtuosoRef}
          data={messages}
          className="w-full h-full scrollbar-thin"
          firstItemIndex={firstItemIndex}
          initialTopMostItemIndex={messages.length - 1}
          followOutput="smooth"
          itemContent={(_, message) => {
            return renderItem(message);
          }}
          startReached={loadNextPage}
        />
        {permissionControl({ userAccess, key: 'boardChatWrite' }) && (
          <Stack
            className={classNames(
              'w-full border-t-[1px] gap-3 p-3',
              isSmallTablet && '!p-1',
            )}
            direction="row"
          >
            <input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value || '');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="w-full h-[50px] resize-none rounded-lg border indent-2 focus:outline-gray-200"
            />
            <Button
              {...{
                text: 'Send',
                className: 'h-[50px]',
                onClick: sendMessage,
                disabled: !message,
              }}
            />
          </Stack>
        )}
      </Stack>
    </ProgressPanel>
  );
};
