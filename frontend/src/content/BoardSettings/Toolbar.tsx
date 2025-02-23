import { t } from 'i18next';
import { Stack } from '../../components/Stack/Stack';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Button } from '../../components/Button';

export const Toolbar = () => {
  const navigate = useNavigate();
  const { boardData: data } = useStateProvider().state.board;

  return (
    <Stack
      className="w-full h-[60px] min-h-[60px] px-3 py-2 border-b"
      justifyContent="between"
    >
      <p>{data?.name}</p>
      <Stack className="gap-2" direction="row" alignItems="center">
        <Button
          {...{
            text: t('Board.settings.return'),
            variant: 'primary',
            onClick: () => {
              navigate(`/boards/${data?.id}/${data?.name}`);
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
