import { t } from 'i18next';
import { Modal } from '../../../components/Modal';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { useApiQuery } from '../../../api/useApiQuery';
import Stack from '../../../components/Stack/Stack';
import { defaultTextStyle } from '../../../common/styles';
import { Textarea } from '../../../components/Textarea';
import { useEffect, useState } from 'react';

export const MemberInfoModal = () => {
  const [value, setValue] = useState('');
  const invalidateQuery = useInvalidateQuery();
  const { state, actions } = useStateProvider();
  const { boardData: data, userToInfo } = state.board;
  const { setUserInfo } = actions;
  const { id } = state.auth;

  const { mutate } = useApiMutation('updateMemberInfoFromBoard', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
      setUserInfo(undefined);
    },
  });

  const { data: memberToInfo, isLoading } = useApiQuery(
    'getBoardMemberData',
    [{ id: data?.id, userId: userToInfo }],
    {
      onSuccess: (data) => {
        setValue(data?.description || '');
      },
      enabled: !!(data?.id && userToInfo),
    },
  );

  const onSubmit = () => {
    if (data?.id && userToInfo)
      mutate({
        id: data?.id,
        userId: userToInfo,
        description: value,
      });
  };

  const canEdit =
    data?.members.find((item) => item.id === id)?.level == 'owner';

  return (
    <Modal
      title={t('Board.settings.members.infoTitle')}
      isVisible={!!userToInfo}
      onClose={() => {
        setUserInfo(undefined);
      }}
      onAccept={onSubmit}
      showButtons={!isLoading && canEdit}
    >
      <Stack className="w-full h-full gap-2" direction="col" alignItems="start">
        <p className={defaultTextStyle}>{memberToInfo?.name}</p>
        <p className={defaultTextStyle}>{memberToInfo?.email}</p>
        <Textarea
          {...{
            value,
            setValue,
            className: 'h-[140px]',
            disabled: !canEdit,
            placeholder: t('Board.settings.members.infoDescription'),
          }}
        />
      </Stack>
    </Modal>
  );
};
