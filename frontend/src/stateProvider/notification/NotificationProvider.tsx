import classNames from 'classnames';
import { Stack } from '../../components/Stack/Stack';
import { useStateProvider } from '../useStateProvider';
import { Icon } from '../../images/Icon';
import { XMarkIcon } from '../../images/icons';
import { defaultTextStyle } from '../../common/styles';

const typeMapping = {
  alert: 'bg-orange-300',
  success: 'bg-green-400',
  error: 'bg-red-300',
  info: 'bg-blue-200',
};

export const NotificationProvider = () => {
  const { state, actions } = useStateProvider();
  const { notifications } = state.notification;
  const { removeNotification } = actions;

  return (
    <Stack
      className="h-full max-h-full overflow-y-auto absolute right-0 top-0 p-4 gap-3"
      direction="col"
      alignItems="end"
    >
      {notifications.map((item) => {
        const className = typeMapping[item.type || 'info'];
        return (
          <Stack
            key={item.id}
            className={classNames(
              'w-auto min-w-[240px] min-h-[30px] overflow-x-hidden cursor-pointer relative border border-gray-300 rounded-lg py-1 px-2 pr-8',
              className,
            )}
            direction="col"
            alignItems="start"
            onClick={() => {
              item.id && removeNotification(item.id);
            }}
          >
            <Icon className="absolute -top-1 -right-2" hoverable={false}>
              <XMarkIcon className="h-5 w-5" color="gray" />
            </Icon>
            <p className={classNames(defaultTextStyle, 'font-semibold')}>
              {item.title}
            </p>
            <p className={classNames(defaultTextStyle)}>{item.subtitle}</p>
          </Stack>
        );
      })}
    </Stack>
  );
};
