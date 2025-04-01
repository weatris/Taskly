import { useState } from 'react';
import { Input } from '../../components/basic/Input';
import { Stack } from '../../components/basic/Stack/Stack';
import { t } from 'i18next';
import { Textarea } from '../../components/basic/Textarea';
import { Button } from '../../components/basic/Button';
import { AccessTypeSelect } from '../../components/AccessTypeSelect';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { useApiMutation } from '../../api/useApiMutation';
import { useInvalidateQuery } from '../../api/useInvalidateQuery';
import { boardAccessType } from '../../common/typing';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { permissionControl } from '../../utils/permissionControl';
import { AccessTypeBadge } from '../../components/AccessTypeBadge';
import classNames from 'classnames';
import { useScreenDetector } from '../../utils/useScreenDetector';
import { Accordion } from '../../components/basic/Accordion';

export const BoardManagement = () => {
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();
  const { isMobile } = useScreenDetector();

  const { boardData, userAccess } = useStateProvider().state.board;
  const [name, setName] = useState(boardData?.name || '');
  const [description, setDescription] = useState(boardData?.description || '');
  const [selectedOption, setSelectedOption] = useState(boardData?.type || '');

  const { mutate } = useApiMutation('updateBoard', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('Board.settings.boardManagement.cantUpdate'),
        tp: 'alert',
      });
    },
  });

  const onSubmit = () => {
    boardData?.id &&
      mutate({
        id: boardData?.id,
        name,
        description,
        type: selectedOption as boardAccessType,
      });
  };

  const isChanged =
    name !== boardData?.name ||
    description !== boardData?.description ||
    selectedOption !== boardData?.type;

  const canEdit = permissionControl({ userAccess, key: 'boardEdit' });
  const canDelete = permissionControl({ userAccess, key: 'boardDelete' });
  const canBoardControl = permissionControl({
    userAccess,
    key: 'boardControl',
  });

  return (
    <Stack
      className={classNames(
        'h-full overflow-auto px-2 py-4 gap-4 border-r',
        isMobile ? 'w-full' : 'min-w-[350px]',
      )}
      direction="col"
    >
      <p className="text-xl">{t('Board.settings.boardManagement.header')}</p>
      <Input
        {...{
          value: name,
          setValue: setName,
          className: 'border',
          placeholder: t('Boards.createBoard.name'),
          disabled: !canEdit,
        }}
      />
      <Textarea
        {...{
          value: description,
          setValue: setDescription,
          className: 'w-full min-h-[120px]',
          disabled: !canEdit,
        }}
      />
      {canBoardControl ? (
        <Accordion title={t('Board.settings.dangerousSection')}>
          <AccessTypeSelect {...{ selectedOption, setSelectedOption }} />

          <Stack className="w-full mt-auto" direction="row" alignItems="center">
            {canDelete && (
              <Button
                {...{
                  text: t('common.delete'),
                  variant: 'secondary',
                  className: 'w-[120px] mt-5 mr-auto ',
                  onClick: onSubmit,
                }}
              />
            )}
          </Stack>
        </Accordion>
      ) : (
        <>
          <AccessTypeBadge
            {...{ tp: boardData?.type, className: 'w-full h-[40px]' }}
          />
        </>
      )}
      {canEdit && (
        <Button
          {...{
            text: t('common.update'),
            className: 'w-[120px] mt-auto ml-auto',
            disabled: !isChanged,
            onClick: onSubmit,
          }}
        />
      )}
    </Stack>
  );
};
