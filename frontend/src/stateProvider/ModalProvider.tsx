import { ShareBoardModal } from '../content/BoardPage/ShareBoardModal';
import { ExcludeMemberModal } from '../content/BoardSettings/Members/ExcludeMemberModal';
import { MemberInfoModal } from '../content/BoardSettings/Members/MemberInfoModal';
import { useStateProvider } from './useStateProvider';

export const ModalProvider = () => {
  const { state } = useStateProvider();
  const { shareBoardId, userToExclude, openMemberInfo } = state.board;
  return (
    <>
      {!!shareBoardId && <ShareBoardModal />}
      {!!userToExclude && <ExcludeMemberModal />}
      {!!openMemberInfo && <MemberInfoModal />}
    </>
  );
};
