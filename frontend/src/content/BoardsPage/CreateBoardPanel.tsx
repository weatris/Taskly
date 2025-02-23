import { inputStyle } from '../../common/styles';
import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { t } from 'i18next';
import { Stack } from '../../components/Stack/Stack';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { Button } from '../../components/Button';
import { boardAccessType } from '../../common/typing';
import { Textarea } from '../../components/Textarea';
import { AccessTypeSelect } from '../../components/AccessTypeSelect';

export const CreateBoardPanel = ({
  showCreateBoardModal,
  onClose,
  onSuccess,
}: {
  showCreateBoardModal: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { addNotification } = useNotification();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('public');

  const { mutate } = useApiMutation('createBoard', {
    onSuccess,
    onError: () => {
      addNotification({ title: t('Boards.createBoard.cantCreate') });
    },
  });

  const onAccept = () => {
    if (!selectedOption || !name) {
      addNotification({ title: t('Boards.createBoard.fillData') });
      return;
    }

    mutate({
      params: {
        name: name,
        description,
        type: selectedOption as boardAccessType,
      },
    });
  };

  return (
    <Modal
      {...{
        isVisible: showCreateBoardModal,
        title: t('Boards.createBoard.title'),
        onClose,
        onAccept,
      }}
    >
      <Stack className="w-full h-full gap-4" direction="col">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={inputStyle}
          placeholder={t('Boards.createBoard.name')}
        />
        <AccessTypeSelect {...{ selectedOption, setSelectedOption }} />
        <Textarea
          {...{
            value: description,
            setValue: setDescription,
            className: 'h-[150px]',
            placeholder: t('Boards.createBoard.description'),
          }}
        />
      </Stack>
    </Modal>
  );
};
