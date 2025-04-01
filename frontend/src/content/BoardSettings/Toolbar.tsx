import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Button } from '../../components/basic/Button';
import { ArrowLeftIcon } from './../../images/icons';
import { useScreenDetector } from '../../utils/useScreenDetector';

export const Toolbar = () => {
  const navigate = useNavigate();
  const { boardData: data } = useStateProvider().state.board;
  const { isSmallTablet } = useScreenDetector();

  return (
    <Stack
      className="w-full h-[60px] min-h-[60px] px-3 border-b"
      justifyContent="between"
    >
      {isSmallTablet ? (
        <Stack
          className="w-[50px] min-w-[50px] h-full"
          direction="row"
          alignItems="center"
        >
          <Button
            {...{
              size: 'sm',
              variant: 'primary',
              icon: <ArrowLeftIcon />,
              onClick: () => {
                navigate(`/boards/${data?.id}/${data?.name}`);
              },
            }}
          />
        </Stack>
      ) : (
        <div />
      )}

      <Stack
        className="w-full overflow-hidden"
        direction="row"
        justifyContent="center"
      >
        <p className="w-full text-center truncate">{data?.name}</p>
      </Stack>

      {isSmallTablet ? (
        <div className="w-[50px] min-w-[50px]" />
      ) : (
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
      )}
    </Stack>
  );
};
