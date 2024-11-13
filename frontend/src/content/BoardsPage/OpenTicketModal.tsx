import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useApiMutation } from '../../api/useApiMutation';
import { EditableName } from '../../components/EditableName';
import { Icon } from '../../images/Icon';
import { PencilIcon } from '@heroicons/react/24/solid';

const Title = ({ data }: { data: ticketType | undefined }) => {
  const [value, setValue] = useState(data?.name || '');

  const { mutate: handleRename, isLoading } = useApiMutation('renameTicket');

  useEffect(() => {
    setValue(data?.name || '');
  }, [data?.name]);

  if (!data) {
    return <></>;
  }

  const handleSave = () => {
    handleRename({ id: data.id, newName: value });
  };

  return (
    <Stack
      className="h-full h-[40px] gap-2 [&>div]:w-full"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <EditableName {...{
        value, 
        setValue,
        initValue:value,
        isLoading,
        onClickAway: handleSave,
        className: 'w-full bg-transparent border-none shadow-none'
      }}/>
    </Stack>
  );
};

export const OpenTicketModal = () => {
  const { id = '', ticketId = '' } = useParams();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const { data, isLoading } = useApiQuery('getTicketById', [{ id: ticketId }], {
    enabled: !!ticketId,
    onError: () => {
      addNotification({
        title: t('Tickets.cantLoadError'),
        tp: 'alert',
      });
      navigate(`/boards/${id}`);
    },
  });

  return (
    <Modal
      {...{
        isVisible: !!ticketId,
        title: <Title {...{ data }} />,
        modalType: 'info',
        onClose: () => {
          navigate(`/boards/${id}`);
        },
        titleClasssnames: 'h-[80px]',
      }}
    >
      <ProgressPanel {...{ isLoading }}>
        <Stack className="w-full h-full gap-1" direction="row">
          
          <Stack className="w-full h-full gap-2" direction="col">
            <Stack className="w-full h-1/2 border-[1px]">
              {data?.description}
              {/* todo: use rich text editor */}
            </Stack>
            <Stack className="w-full h-1/2 border-[1px]" alignItems='center' justifyContent='center'>
              chat
            </Stack>
          </Stack>
          <Stack className="w-[500px] h-full p-2 border-[1px]" direction="col" alignItems='start'>
            <Stack className='h-fit p-1 rounded-md hover:bg-gray-100 hover:cursor-pointer' direction='row' alignItems='center'>
            <p>{t('Tickets.groupBtn')} {data?.groupName}</p>
            <Icon
            size="sm"
            hoverable={false}
          >
            
              <PencilIcon color="gray" />
          </Icon>
            </Stack>
          </Stack>
        </Stack>
      </ProgressPanel>
    </Modal>
  );
};
