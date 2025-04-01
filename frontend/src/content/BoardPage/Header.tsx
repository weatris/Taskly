import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { ShareBoardButton } from '../../components/ShareBoardButton';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/basic/Button';
import {
  Cog8ToothIcon,
  ChatBubbleLeftIcon,
  ArrowLeftIcon,
} from '../../images/icons';
import { TicketFilterButton } from './TicketFilterModal/TicketFilterButton';
import { useScreenDetector } from '../../utils/useScreenDetector';
import classNames from 'classnames';

const MobileExtraHeader = () => {
  const navigate = useNavigate();
  const { state } = useStateProvider();
  const { boardData: data } = state.board;
  const { isSmallTablet } = useScreenDetector();

  if (!isSmallTablet) {
    return <></>;
  }

  return (
    <>
      <Stack
        className="w-full h-[60px] min-h-[60px] px-3 bg-white border-b"
        direction="row"
        justifyContent="between"
      >
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
                navigate('/');
              },
            }}
          />
        </Stack>

        <Stack
          className="w-full overflow-hidden"
          direction="row"
          justifyContent="center"
        >
          <p className="w-full text-center truncate">{data?.name}</p>
        </Stack>

        <Stack
          className="w-[50px] min-w-[50px] h-full"
          direction="row"
          alignItems="center"
        >
          <Button
            {...{
              size: 'sm',
              variant: 'primary',
              icon: <Cog8ToothIcon />,
              onClick: () => {
                navigate('settings');
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export const Header = () => {
  const navigate = useNavigate();
  const { state, actions } = useStateProvider();
  const { userAccess, boardData: data } = state.board;
  const { setShowGroupChat } = actions;

  const { isSmallTablet } = useScreenDetector();

  return (
    <>
      <MobileExtraHeader />
      <Stack
        className="w-full h-[60px] min-h-[60px] px-3 py-2 gap-2 border-b-[2px]"
        justifyContent="between"
      >
        {!isSmallTablet && <p className="w-fit truncate">{data?.name}</p>}

        <Stack
          className={classNames('gap-2', isSmallTablet && 'w-full')}
          direction="row"
          justifyContent={isSmallTablet ? 'between' : 'start'}
        >
          <TicketFilterButton />
          <Button
            {...{
              text: t('Board.globalChat'),
              variant: 'primary',
              icon: <ChatBubbleLeftIcon />,
              onClick: () => {
                setShowGroupChat(true);
              },
            }}
          />
          {!isSmallTablet && (
            <Button
              {...{
                text: t('Board.settings.title'),
                variant: 'primary',
                icon: <Cog8ToothIcon />,
                onClick: () => {
                  navigate('settings');
                },
              }}
            />
          )}
          {!isSmallTablet && (
            <ShareBoardButton {...{ id: data?.id, userAccess }} />
          )}
        </Stack>
      </Stack>
    </>
  );
};
