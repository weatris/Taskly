import { t } from 'i18next';
import { Modal } from '../../../components/Modal';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { useApiQuery } from '../../../api/useApiQuery';
import { Stack } from '../../../components/Stack/Stack';
import { defaultTextStyle } from '../../../common/styles';
import { Textarea } from '../../../components/Textarea';
import { useState } from 'react';
import { permissionControl } from '../../../utils/permissionControl';
import Select from '../../../components/Select';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';
import { permissionLevelType } from '../../../common/typing';

export const MemberInfoModal = () => {
  const invalidateQuery = useInvalidateQuery();
  const { state, actions } = useStateProvider();
  const { boardData: data, openMemberInfo, userAccess } = state.board;
  const { setOpenMemberInfo } = actions;
  const { id: userId } = state.auth;

  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');

  const { data: memberToInfo, isLoading } = useApiQuery(
    'getBoardMemberData',
    [{ id: data?.id, userId: openMemberInfo }],
    {
      onSuccess: (data) => {
        setDescription(data?.description || '');
        setLevel(data?.level || '');
      },
      enabled: !!(data?.id && openMemberInfo),
    },
  );

  const { mutate } = useApiMutation('updateMemberInfoFromBoard', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
      setOpenMemberInfo(undefined);
    },
  });

  const onSubmit = () => {
    if (data?.id && openMemberInfo)
      mutate({
        id: data?.id,
        userId: openMemberInfo,
        description,
        level: level as permissionLevelType,
      });
  };

  const canEdit =
    memberToInfo?.id === userId ||
    (memberToInfo?.level !== 'owner' &&
      permissionControl({ userAccess, key: 'memberEdit' }));

  const changePermissionLevels =
    memberToInfo?.level !== 'owner' &&
    permissionControl({
      userAccess,
      key: 'changePermissionLevels',
    });

  const availableOptions = [
    {
      key: 'admin',
      title: t('permissionLevels.admin'),
    },
    {
      key: 'member',
      title: t('permissionLevels.member'),
    },
    {
      key: 'owner',
      title: t('permissionLevels.owner'),
    },
  ];

  return (
    <Modal
      title={t('Board.settings.members.infoTitle')}
      isVisible={!!openMemberInfo}
      onClose={() => {
        setOpenMemberInfo(undefined);
      }}
      onAccept={onSubmit}
      showButtons={!isLoading && canEdit}
    >
      <ProgressPanel isLoading={!memberToInfo || isLoading}>
        <Stack
          className="w-full h-full gap-2"
          direction="col"
          alignItems="start"
        >
          <p className={defaultTextStyle}>{memberToInfo?.name}</p>
          <p className={defaultTextStyle}>{memberToInfo?.email}</p>

          {changePermissionLevels ? (
            <Select
              {...{
                initValue: level,
                options: availableOptions,
                onChange: setLevel,
              }}
            />
          ) : (
            <Stack className="w-full h-[50px] px-2 rounded-lg border">
              <p>{t(`permissionLevels.${memberToInfo?.level}`)}</p>
            </Stack>
          )}

          <Textarea
            {...{
              value: description,
              setValue: setDescription,
              className: 'h-[140px]',
              disabled: !canEdit,
              placeholder: t('Board.settings.members.infoDescription'),
            }}
          />
        </Stack>
      </ProgressPanel>
    </Modal>
  );
};
