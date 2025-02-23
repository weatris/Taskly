import classNames from 'classnames';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Stack } from '../Stack/Stack';
import { chatMessageType } from '../../common/typing';

export const Message = ({ message }: { message: chatMessageType }) => {
  const { id } = useStateProvider().state.auth;
  return (
    <Stack
      className={classNames(
        'w-fit h-[40px] p-2 border rounded-lg shadow-sm',
        id == message.user.id && 'ml-auto',
      )}
    >
      {message.content}
    </Stack>
  );
};
