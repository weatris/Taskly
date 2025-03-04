import classNames from 'classnames';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Stack } from '../basic/Stack/Stack';
import { chatMessageType } from '../../common/typing';
import { Avatar } from '../basic/Avatar';
import { Spinner } from '../basic/Spinner';

export const Message = ({ message }: { message: chatMessageType }) => {
  const { id } = useStateProvider().state.auth;
  const isOwnMessage = id == message.user.id;

  return (
    <Stack className="px-3 py-4">
      <Stack
        className={classNames(
          'w-fit max-w-[400px] h-fit min-h-[40px] gap-3',
          isOwnMessage && 'ml-auto',
        )}
        direction="row"
      >
        {message.isLoading && <Spinner size="md" />}
        <Stack
          className={classNames(
            'w-full h-full relative py-2 px-3 gap-2 bg-white border rounded-lg shadow-sm',
            isOwnMessage && '!bg-gray-50',
          )}
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
  );
};
