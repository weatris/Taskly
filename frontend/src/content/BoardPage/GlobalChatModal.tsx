import { t } from 'i18next';
import { Modal } from '../../components/basic/Modal';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Chat } from '../../components/Chat/Chat';
import { chatMessageType } from '../../common/typing';
import { DetailedMessage } from '../../components/Chat/DetailedMessage';
import { useRemoveQuery } from '../../api/useRemoveQuery';

const renderItem = (message: chatMessageType) => {
  return <DetailedMessage {...{ message }} />;
};

export const GlobalChatModal = () => {
  const { state, actions } = useStateProvider();
  const { showGroupChat, boardData } = state.board;
  const { setShowGroupChat } = actions;
  const removeQuery = useRemoveQuery();

  const onClose = () => {
    removeQuery('getChatData');
    setShowGroupChat(false);
  };

  if (!boardData?.id || !showGroupChat) {
    return <></>;
  }

  return (
    <Modal
      {...{
        isVisible: !!showGroupChat,
        modalType: 'info',
        title: t('Board.globalChat'),
        onClose,
        showButtons: false,
      }}
    >
      <Chat
        {...{
          chatId: boardData.id,
          boardId: boardData.id,
          ticketId: '',
          renderItem,
        }}
      />
    </Modal>
  );
};
