import { useNavigate } from 'react-router-dom';
import { AccessTypeBadge } from '../../components/AccessTypeBadge';
import { Button } from '../../components/Button';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { useState } from 'react';
import { t } from 'i18next';
import { CreateBoardPanel } from './CreateBoardPanel';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { SearchInput } from '../../components/SearchInput';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { InfoPanel } from '../../components/StatePanels/InfoPanel';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { boardAccessType } from '../../common/typing';

const NoBoardCreated = () => {
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

export const Boards = () => {
  const navigate = useNavigate();
  const { state, actions } = useStateProvider();
  const { showCreateBoardModal } = state.board;
  const { toggleCreateBoardModal } = actions;
  const [searchValue, setSearchValue] = useState('');
  const { addNotification } = useNotification();

  const [selectedOption, setSelectedOption] = useState('public');
  const options = [
    { title: t('accessTypes.all'), key: 'all' },
    { title: t('accessTypes.public'), key: 'public' },
    { title: t('accessTypes.private'), key: 'private' },
    { title: t('accessTypes.closed'), key: 'closed' },
  ];

  const {
    data = [],
    isLoading,
    isError,
    refetch,
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

  return (
    <Stack
      className="w-full h-full"
      direction="col"
      alignItems="start"
      justifyContent="start"
    >
      <Stack
        className="w-full p-3 border-b"
        direction="row"
        alignItems="center"
        justifyContent="between"
      >
        <SearchInput
          {...{
            value: searchValue,
            setValue: setSearchValue,
            debounce: true,
          }}
        />
        <Stack className="gap-2" direction="row">
          {options.map((item) => {
            return (
              <Button
                key={item.key}
                className="w-full"
                text={item.title}
                variant={item.key == selectedOption ? 'default' : 'primary'}
                onClick={() => {
                  setSelectedOption(item.key);
                }}
              />
            );
          })}
        </Stack>
        <Button
          text={t('Boards.createBoard.title')}
          onClick={() => {
            toggleCreateBoardModal(true);
          }}
        />
      </Stack>
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
          className="w-full h-full gap-3 p-5"
          direction="row"
          alignItems="start"
          wrap="wrap"
        >
          {data.map((item) => (
            <Stack
              key={item.id}
              className="w-[200px] h-[300px] min-w-[200px] min-h-[300px] relative border rounded-lg shadow-sm cursor-pointer"
              direction="col"
              onClick={() => {
                navigate(
                  `/boards/${item.id}/${item.name.replaceAll('/* ', '_')}`,
                );
              }}
            >
              <div className="w-full rounded-t-lg overflow-hidden">
                <p className="w-full bg-gray-50 truncate border-b py-2 px-1 text-lg">
                  {item.name}
                </p>
              </div>
              <AccessTypeBadge
                tp={item.type}
                className="absolute right-1 -top-4"
              />
            </Stack>
          ))}
        </Stack>
      </ProgressPanel>
      <CreateBoardPanel
        {...{
          showCreateBoardModal,
          onClose: () => {
            toggleCreateBoardModal(false);
          },
          onSuccess: () => {
            refetch();
            toggleCreateBoardModal(false);
          },
        }}
      />
    </Stack>
  );
};
