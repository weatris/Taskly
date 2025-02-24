import { t } from 'i18next';
import { useApiMutation } from '../../../api/useApiMutation';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { Modal } from '../../../components/basic/Modal';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { Stack } from '../../../components/basic/Stack/Stack';
import { useState } from 'react';
import { Input } from '../../../components/basic/Input';

export const UpdateGroupModal = () => {
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();

  const { state, actions } = useStateProvider();
  const { setUpdateGroupId } = actions;

  const { boardData, updateGroupId } = state.board;
  const groupData = boardData?.groups.find((item) => item.id == updateGroupId);
  const [value, setValue] = useState(groupData?.name || '');

  const { mutate } = useApiMutation('updateGroup', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
      setUpdateGroupId('');
    },
    onError: () => {
      addNotification({
        title: t('Groups.cantUpdate'),
        tp: 'alert',
      });
    },
  });

  const onAccept = () => {
    if (groupData?.id) mutate({ id: groupData?.id, newValue: value });
  };

  return (
    <Modal
      {...{
        title: t('Groups.updateGroup'),
        modalType: 'modal',
        isVisible: !!updateGroupId,
        onClose: () => {
          setUpdateGroupId('');
        },
        onAccept,
      }}
    >
      <Stack className="w-full h-full gap-2" direction="col">
        <Input
          {...{
            value,
            setValue,
            className: 'w-full border',
            placeholder: 'Name',
          }}
        />
      </Stack>
    </Modal>
  );
};
