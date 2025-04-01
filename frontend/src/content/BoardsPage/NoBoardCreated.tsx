import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Button } from '../../components/basic/Button';

export const NoBoardCreated = () => {
  const { toggleCreateBoardModal } = useStateProvider().actions;

  return (
    <Stack
      className="w-full h-full"
      direction="col"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        className="p-3 rounded-md border-gray-200 border-[1px] shadow-md"
        direction="col"
        alignItems="center"
        justifyContent="center"
      >
        <p className="text-xl text-gray-400 mb-3">
          {t('Boards.noBoardCreated')}
        </p>
        <Button
          text={t('Boards.createBoard.title')}
          onClick={() => {
            toggleCreateBoardModal(true);
          }}
        />
      </Stack>
    </Stack>
  );
};
