import { inputStyle } from '../../common/styles';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from '../../components/Modal';
import Select from '../../components/Select';
import { t } from 'i18next';
import Stack from '../../components/Stack/Stack';

export const CreateBoardPanel = ({
  showCreateBoardModal,
  setShowCreateBoardModal,
}: {
  showCreateBoardModal: boolean;
  setShowCreateBoardModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const options = [
        { title: t('accessTypes.public'), key: 'public' },
        { title: t('accessTypes.private'), key: 'private' },
        { title: t('accessTypes.closed'), key: 'closed' }
      ];

  return (
    <Modal
      {...{
        isVisible: showCreateBoardModal,
        title: 'tester',
        onClose: () => {
          setShowCreateBoardModal(false);
        },
        onAccept: () => {
          console.log(123456);
        },
      }}
    >
      <Stack className='w-full h-full gap-4' direction='col'>
      <input className={inputStyle} placeholder="Name" />
      <Select options={options} onChange={(value)=>{
        setSelectedOption(value);
      }}/>
      </Stack>
    </Modal>
  );
};
