import classNames from 'classnames';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Stack } from '../basic/Stack/Stack';
import { chatMessageType } from '../../common/typing';
import { Avatar } from '../basic/Avatar';
import { Spinner } from '../basic/Spinner';
import { useNavigate } from 'react-router-dom';

export const DetailedMessage = ({ message }: { message: chatMessageType }) => {
  const navigate = useNavigate();
  const { state, actions } = useStateProvider();
  const { id } = state.auth;
  const { setShowGroupChat } = actions;
  const { boardData } = state.board;

  const tickets = state.board.boardData?.tickets || [];
  const parentTicket = tickets.find((item) => item.id == message.ticketId);

  const isOwnMessage = id == message.user.id;

  const onClick = () => {
    if (parentTicket && boardData) {
      const { id: boardId, name } = boardData;
      navigate(`/boards/${boardId}/${name}/tickets/${parentTicket.id}`);
      setShowGroupChat(false);
    }
  };

  return (
    <Stack className="px-2 py-4">
      <Stack
        className={classNames(
          'w-fit max-w-[400px] h-fit min-h-[40px] gap-3',
          isOwnMessage && 'ml-auto',
        )}
        direction="row"
      >
        {message.isLoading && <Spinner size="md" />}
        <Stack direction="col">
          {!!parentTicket && (
            <p
              className="w-full bg-gray-300 rounded-t-lg px-3 cursor-pointer"
              onClick={onClick}
            >
              {parentTicket.name}
            </p>
          )}
          <Stack
            className={classNames(
              'w-full h-full relative py-2 px-3 bg-white border shadow-sm',
              parentTicket ? 'rounded-b-lg' : 'rounded-lg',
              isOwnMessage && '!bg-gray-50',
            )}
            direction="col"
          >
            <div className="absolute -top-1 -left-2">
              <Avatar
                {...{
                  userData: message.user,
                  size: 'sm',
                  placing: isOwnMessage ? 'left' : 'right',
                }}
              />
            </div>
            <p>{message.content}</p>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
