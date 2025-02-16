import Stack from '../../../components/Stack/Stack';
import { t } from 'i18next';
import { Button } from '../../../components/Button';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { boardType, permissionLevels } from '../../../common/typing';
import { Modal } from '../../../components/Modal';
import { MembersItem } from './MembersItem';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';

export const Members = ({ data }: { data?: boardType }) => {
  const invalidateQuery = useInvalidateQuery();
  const { state, actions } = useStateProvider();
  const { userToExclude } = state.board;
  const { setShareBoardId, setUserToExclude } = actions;

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

  const membersSorted = [...(data?.members || [])].sort(
    (a, b) =>
      permissionLevels.indexOf(b.level) - permissionLevels.indexOf(a.level),
  );
  const memberToExclude = membersSorted.find(
    (item) => item.id == userToExclude,
  );

  return (
    <>
      <Stack className="w-[400px] h-full p-2 gap-2 border-l" direction="col">
        <p className="text-xl">{t('Board.settings.members.header')}</p>
        <Stack className="w-full h-full pt-1 gap-4" direction="col">
          {membersSorted.map((item) => (
            <MembersItem key={item.id} {...{ item }} />
          ))}
        </Stack>
        <Button
          {...{
            className: 'w-full',
            text: t('Board.share'),
            onClick: () => {
              data?.id && setShareBoardId(data?.id);
            },
          }}
        />
      </Stack>
      <Modal
        title={t('Board.settings.members.excludeTitle')}
        isVisible={!!userToExclude}
        onClose={() => {
          setUserToExclude(0);
        }}
        onAccept={onSubmit}
        modalType="modal"
      >
        <>
          {t('Board.settings.members.excludeConfirm', {
            username: memberToExclude?.name,
          })}
        </>
      </Modal>
    </>
  );
};
