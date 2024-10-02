import { useNavigate } from 'react-router-dom';
import { AccessTypeBadge } from '../../components/AccessTypeBadge';
import { Button } from '../../components/Button';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { useState } from 'react';
import { t } from 'i18next';
import { CreateBoardPanel } from './CreateBoardPanel';

export const Boards = () => {
  const navigate = useNavigate();
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const { data = [], refetch } = useApiQuery('searchBoards', [
    {
      params: {
        name: '',
        type: 'public',
      },
    },
  ]);

  return (
    <Stack
      className="w-full h-full"
      direction="col"
      alignItems="start"
      justifyContent="start"
    >
      <Stack
        className="w-full p-3 border-b"
        direction="row"
        alignItems="center"
        justifyContent="end"
      >
        <Button
          text={t('Boards.createBoard.title')}
          onClick={() => {
            setShowCreateBoardModal(true);
          }}
        />
      </Stack>

      <Stack
        className="w-full h-full gap-3 p-5"
        direction="row"
        alignItems="start"
        wrap="wrap"
      >
        {data.map((item) => (
          <Stack
            key={item.id}
            className="w-[200px] h-[300px] min-w-[200px] min-h-[300px] relative border rounded-lg shadow-sm cursor-pointer"
            direction="col"
            onClick={() => {
              navigate(`/boards/${item.id}`);
            }}
          >
            <div className="w-full rounded-t-lg overflow-hidden">
              <p className="w-full bg-gray-50 truncate border-b py-2 px-1 text-lg">
                {item.name}
              </p>
            </div>
            <AccessTypeBadge
              tp={item.type}
              className="absolute right-1 -top-4"
            />
          </Stack>
        ))}
      </Stack>
      <CreateBoardPanel
        {...{
          showCreateBoardModal,
          setShowCreateBoardModal,
          onSuccess: () => {
            refetch();
            setShowCreateBoardModal(false);
          },
        }}
      />
    </Stack>
  );
};
