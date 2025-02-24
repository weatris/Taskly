import { t } from 'i18next';
import { useApiMutation } from '../../../api/useApiMutation';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { Modal } from '../../../components/basic/Modal';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { Stack } from '../../../components/basic/Stack/Stack';

export const DeleteGroupModal = () => {
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();

  const { state, actions } = useStateProvider();
  const { boardData, deleteGroupId } = state.board;
  const { setDeleteGroupId } = actions;
  const groupData = boardData?.groups.find((item) => item.id == deleteGroupId);

  const { mutate } = useApiMutation('deleteGroup', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
      setDeleteGroupId('');
    },
    onError: () => {
      addNotification({
        title: t('Groups.cantDelete'),
        tp: 'alert',
      });
    },
  });

  const onAccept = () => {
    if (groupData?.id) mutate({ id: groupData?.id });
  };

  return (
    <Modal
      {...{
        title: t('Groups.deleteGroup'),
        modalType: 'modal',
        isVisible: !!deleteGroupId,
        onClose: () => {
          setDeleteGroupId('');
        },
        onAccept,
      }}
    >
      <Stack className="w-full h-full gap-2" direction="col">
        <p className="w-full mx-auto border rounded-lg bg-gray-100 p-2">
          {groupData?.name}
        </p>
        <p className="w-full">{t('Groups.deleteGroupInfo')}</p>
        <p className="w-full">{t('Groups.deleteGroupConfirmation')}</p>
      </Stack>
    </Modal>
  );
};
