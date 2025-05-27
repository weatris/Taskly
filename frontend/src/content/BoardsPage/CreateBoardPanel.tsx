import { inputStyle } from '../../common/styles';
import { useState } from 'react';
import { Modal } from '../../components/basic/Modal';
import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { boardAccessType } from '../../common/typing';
import { Textarea } from '../../components/basic/Textarea';
import { AccessTypeSelect } from '../../components/AccessTypeSelect';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { useNavigate } from 'react-router-dom';

export const CreateBoardPanel = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('public');
  const {state, actions} = useStateProvider();
  const { showCreateBoardModal } = state.board;
  const { toggleCreateBoardModal } = actions;

  const { mutate } = useApiMutation('createBoard', {
    onSuccess: ({id})=>{
      navigate(`/boards/${id}/${name}`);
      toggleCreateBoardModal(false);
    },
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
        onClose : ()=>{
          toggleCreateBoardModal(false);
        },
        onAccept,
        dataTestIdPrefix:"CreateBoardModal"
      }}
    >
      <Stack className="w-full h-full gap-4" direction="col">
        <input
          value={name}
          data-testid="createBoardName"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={inputStyle}
          placeholder={t('Boards.createBoard.name')}
        />
        <AccessTypeSelect {...{ selectedOption, setSelectedOption, allowClosed: false }} />
        <Textarea
          {...{
            value: description,
            setValue: setDescription,
            className: 'h-[150px]',
            dataTestId: 'createBoardDescription',
            placeholder: t('Boards.createBoard.description'),
          }}
        />
      </Stack>
    </Modal>
  );
};
