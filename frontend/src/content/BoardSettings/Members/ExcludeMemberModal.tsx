import { t } from 'i18next';
import { Modal } from '../../../components/Modal';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { useApiQuery } from '../../../api/useApiQuery';

export const ExcludeMemberModal = () => {
  const invalidateQuery = useInvalidateQuery();
  const { state, actions } = useStateProvider();
  const { boardData: data, userToExclude } = state.board;
  const { setUserToExclude } = actions;

  const { data: memberToExclude, isLoading } = useApiQuery(
    'getBoardMemberData',
    [{ id: data?.id, userId: userToExclude }],
    {
      enabled: !!(data?.id && userToExclude),
    },
  );

  const { mutate } = useApiMutation('excludeUserFromBoard', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
      setUserToExclude(undefined);
    },
  });

  const onSubmit = () => {
    if (data?.id && userToExclude)
      mutate({
        id: data?.id,
        userId: userToExclude,
      });
  };

  return (
    <Modal
      title={t('Board.settings.members.excludeTitle')}
      isVisible={!!userToExclude}
      onClose={() => {
        setUserToExclude(undefined);
      }}
      onAccept={onSubmit}
      modalType="modal"
      showButtons={!isLoading}
    >
      <>
        {t('Board.settings.members.excludeConfirm', {
          username: memberToExclude?.name,
        })}
      </>
    </Modal>
  );
};
