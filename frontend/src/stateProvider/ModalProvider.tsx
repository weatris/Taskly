import { ShareBoardModal } from '../content/BoardPage/ShareBoardModal';
import { useStateProvider } from './useStateProvider';

export const ModalProvider = () => {
  const { state, actions } = useStateProvider();
  const { shareBoardId } = state.board;
  const { setShareBoardId } = actions;

  return (
    <>
      <ShareBoardModal
        {...{
          show: !!shareBoardId,
          onClose: () => {
            setShareBoardId('');
          },
        }}
      />
    </>
  );
};
