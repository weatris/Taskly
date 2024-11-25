import { inputStyle } from '../../common/styles';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Modal } from '../../components/Modal';
import Select from '../../components/Select';
import { t } from 'i18next';
import Stack from '../../components/Stack/Stack';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { Button } from '../../components/Button';

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
  const [selectedOption, setSelectedOption] = useState('public');
  const options = [
    { title: t('accessTypes.public'), key: 'public' },
    { title: t('accessTypes.private'), key: 'private' },
    { title: t('accessTypes.closed'), key: 'closed' },
  ];

  const nameRef = useRef<HTMLInputElement>(null);
  const { mutate } = useApiMutation('createBoard', {
    onSuccess,
    onError: () => {
      addNotification({ title: t('Boards.createBoard.cantCreate') });
    },
  });

  const onAccept = () => {
    if (!selectedOption || !nameRef.current?.value) {
      addNotification({ title: t('Boards.createBoard.fillData') });
      return;
    }

    mutate({
      params: {
        config: {},
        name: nameRef.current?.value,
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
          ref={nameRef}
          className={inputStyle}
          placeholder={t('Boards.createBoard.name')}
        />
        <Stack className="w-full gap-2" direction="row">
          {options.map((item) => {
            return (
              <Button
                key={item.key}
                className="w-full"
                text={item.title}
                variant={item.key == selectedOption ? 'default' : 'primary'}
                onClick={() => {
                  setSelectedOption(item.key);
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    </Modal>
  );
};
