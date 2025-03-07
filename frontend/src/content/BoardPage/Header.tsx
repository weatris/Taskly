import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { ShareBoardButton } from '../../components/ShareBoardButton';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/basic/Button';
import { Cog8ToothIcon, ChatBubbleLeftIcon } from '../../images/icons';
import { TicketFilterButton } from './TicketFilterModal/TicketFilterButton';

export const Header = () => {
  const navigate = useNavigate();
  const { state, actions } = useStateProvider();
  const { userAccess, boardData: data } = state.board;
  const { setShowGroupChat } = actions;

  return (
    <Stack
      className="w-full h-[60px] min-h-[60px] px-3 py-2 border-b-[2px]"
      justifyContent="between"
    >
      <p>{data?.name}</p>

      <Stack className="gap-2" direction="row">
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
        <ShareBoardButton {...{ id: data?.id, userAccess }} />
      </Stack>
    </Stack>
  );
};
