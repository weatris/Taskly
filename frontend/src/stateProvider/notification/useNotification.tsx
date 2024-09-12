import { generateRandomId } from '../../utils/utils';
import { useStateProvider } from '../useStateProvider';
import { notificationType } from './typing';

export const useNotification = () => {
  const { state, actions } = useStateProvider();
  const { notifications } = state.notification;
  const { addNotification: addNotificationState, removeNotification } = actions;

  const addNotification = ({
    notification,
    lifetime = 3000,
  }: {
    notification: notificationType;
    lifetime?: number;
  }) => {
    const id = generateRandomId(6);

    addNotificationState({
      ...notification,
      id,
    });

    setTimeout(() => {
      removeNotification(id);
    }, lifetime);
  };

  return { notifications, addNotification };
};
