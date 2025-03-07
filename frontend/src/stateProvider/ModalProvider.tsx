import { GlobalChatModal } from '../content/BoardPage/GlobalChatModal';
import { ShareBoardModal } from '../content/BoardPage/ShareBoardModal';
import { TicketFilterModal } from '../content/BoardPage/TicketFilterModal/TicketFilterModal';
import { DeleteGroupModal } from '../content/BoardPage/TicketGroup/DeleteGroupModal';
import { UpdateGroupModal } from '../content/BoardPage/TicketGroup/UpdateGroupModal';
import { ExcludeMemberModal } from '../content/BoardSettings/Members/ExcludeMemberModal';
import { MemberInfoModal } from '../content/BoardSettings/Members/MemberInfoModal';
import { useStateProvider } from './useStateProvider';

export const ModalProvider = () => {
  const { state } = useStateProvider();
  const {
    shareBoardId,
    userToExclude,
    openMemberInfo,
    deleteGroupId,
    updateGroupId,
    showGroupChat,
  } = state.board;
  const { showTicketFilters } = state.ticket;

  return (
    <>
      {!!shareBoardId && <ShareBoardModal />}
      {!!userToExclude && <ExcludeMemberModal />}
      {!!openMemberInfo && <MemberInfoModal />}
      {!!deleteGroupId && <DeleteGroupModal />}
      {!!updateGroupId && <UpdateGroupModal />}
      {!!showGroupChat && <GlobalChatModal />}
      {!!showTicketFilters && <TicketFilterModal />}
    </>
  );
};
