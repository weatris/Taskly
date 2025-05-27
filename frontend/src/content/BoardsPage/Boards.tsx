import { Stack } from '../../components/basic/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { t } from 'i18next';
import { CreateBoardPanel } from './CreateBoardPanel';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { InfoPanel } from '../../components/StatePanels/InfoPanel';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { boardAccessType } from '../../common/typing';
import { NoBoardCreated } from './NoBoardCreated';
import { BoardListItem } from './BoardListItem';
import { BoardsNavbar } from './BoardsNavbar';
import { useScreenDetector } from '../../utils/useScreenDetector';
import classNames from 'classnames';

export const Boards = () => {
  const { state } = useStateProvider();
  const { searchValue, selectedOption } = state.boards;
  const { addNotification } = useNotification();

  const {
    data = [],
    isLoading,
    isError,
  } = useApiQuery(
    'searchBoards',
    [
      {
        params: {
          name: searchValue,
          type: selectedOption as boardAccessType | 'all',
        },
      },
    ],
    {
      onError: () => {
        addNotification({
          title: t('Boards.cantLoad'),
          tp: 'alert',
        });
      },
    },
  );

  const { isMobile } = useScreenDetector();

  return (
    <Stack
      className="w-full h-full"
      direction="col"
      alignItems="start"
      justifyContent="start"
    >
      <BoardsNavbar />
      <ProgressPanel
        {...{
          isLoading,
          isError,
          nothingFound: !data.length,
          nothingFoundComponent: !searchValue ? (
            <NoBoardCreated />
          ) : (
            <InfoPanel />
          ),
        }}
      >
        <Stack
          className={classNames(
            'w-full h-full overflow-auto ',
            isMobile ? 'gap-3 p-2' : 'gap-4 p-6',
          )}
          direction={isMobile ? 'col' : 'row'}
          alignItems="start"
          wrap={isMobile ? 'nowrap' : 'wrap'}
        >
          {data.map((item) => (
            <BoardListItem key={item.id} {...{ item }} />
          ))}
        </Stack>
      </ProgressPanel>
      <CreateBoardPanel/>
    </Stack>
  );
};
