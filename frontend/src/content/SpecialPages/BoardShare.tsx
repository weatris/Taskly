import { useNavigate, useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/useApiQuery';
import { Spinner } from '../../components/Spinner';
import Stack from '../../components/Stack/Stack';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { t } from 'i18next';

export const BoardShare = () => {
  const { id = '', token = '' } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const {} = useApiQuery('joinBoardByLink', [{ id, token }], {
    onSuccess: () => {
      navigate(`/boards/${id}`);
    },
    onError: () => {
      addNotification({
        title: t('Errors.default'),
        tp: 'alert',
      });
    },
  });

  return (
    <Stack className="w-full h-full" direction="col" alignItems="center">
      <Spinner />
    </Stack>
  );
};
