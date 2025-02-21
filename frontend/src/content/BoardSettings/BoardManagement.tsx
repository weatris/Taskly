import { useState } from 'react';
import { Input } from '../../components/Input';
import Stack from '../../components/Stack/Stack';
import { t } from 'i18next';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { AccessTypeSelect } from '../../components/AccessTypeSelect';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { useApiMutation } from '../../api/useApiMutation';
import { useInvalidateQuery } from '../../api/useInvalidateQuery';
import { boardAccessType } from '../../common/typing';
import { useNotification } from '../../stateProvider/notification/useNotification';

export const BoardManagement = () => {
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();

  const { boardData } = useStateProvider().state.board;
  const [name, setName] = useState(boardData?.name || '');
  const [description, setDescription] = useState(boardData?.description || '');
  const [selectedOption, setSelectedOption] = useState(boardData?.type || '');

  const { mutate } = useApiMutation('updateBoard', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('Board.settings.basic.cantUpdate'),
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

  return (
    <Stack
      className="w-[300px] min-w-[300px] h-full p-2 gap-4 border-r"
      direction="col"
    >
      <p className="text-xl">{t('Board.settings.basic.header')}</p>
      <Input
        {...{
          value: name,
          setValue: setName,
          className: 'border',
          placeholder: t('Boards.createBoard.name'),
        }}
      />
      <Textarea
        {...{
          value: description,
          setValue: setDescription,
          className: 'w-full',
        }}
      />
      <AccessTypeSelect {...{ selectedOption, setSelectedOption }} />
      <Button
        {...{
          text: t('common.update'),
          className: 'w-[120px] mt-auto ml-auto',
          disabled: !isChanged,
          onClick: onSubmit,
        }}
      />
    </Stack>
  );
};
