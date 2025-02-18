import { ShareBoardModal } from '../content/BoardPage/ShareBoardModal';
import { ExcludeMemberModal } from '../content/BoardSettings/Members/ExcludeMemberModal';
import { MemberInfoModal } from '../content/BoardSettings/Members/MemberInfoModal';

export const ModalProvider = () => {
  return (
    <>
      <ShareBoardModal />
      <ExcludeMemberModal />
      <MemberInfoModal />
    </>
  );
};
