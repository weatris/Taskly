import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';

const Title = ({ data }: { data: ticketType | undefined }) => {
  return (
    <Stack className='gap-2' direction="row" alignItems="center">
      <div className="border border-black px-2">
        <p>{data?.groupId}</p>
      </div>:
      <p>{data?.name}</p>
    </Stack>
  );
};

export const OpenTicketModal = () => {
  const { id = '', ticketId = '' } = useParams();
  const navigate = useNavigate();

  const { data } = useApiQuery('getTicketById', [{ id: ticketId }], {
    enabled: !!ticketId,
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
      }}
    >
      <Stack className="w-full h-full gap-1" direction="row">
        <Stack className="w-full h-full border-[1px]" direction="col">
          <Stack className="w-full h-full border-b">
            {data?.description}tester
          </Stack>
        </Stack>
        <Stack className="w-[300px] h-full border-[1px]" direction="col">
          tester
        </Stack>
      </Stack>
    </Modal>
  );
};
