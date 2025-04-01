import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { SearchInput } from '../../components/SearchInput';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Button } from '../../components/basic/Button';
import { useScreenDetector } from '../../utils/useScreenDetector';
import { Icon } from '../../images/Icon';
import { MagnifyingGlassIcon, PlusIcon } from '../../images/icons';
import { useState } from 'react';

export const BoardsNavbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { state, actions } = useStateProvider();
  const { searchValue, selectedOption } = state.boards;
  const { setSearchValue, setSelectedOption, toggleCreateBoardModal } = actions;

  const options = [
    { title: t('accessTypes.all'), key: 'all' },
    { title: t('accessTypes.public'), key: 'public' },
    { title: t('accessTypes.private'), key: 'private' },
    { title: t('accessTypes.closed'), key: 'closed' },
  ];

  const { isMobile, isTablet } = useScreenDetector();

  return (
    <>
      <Stack
        className="w-full p-3 border-b"
        direction="row"
        alignItems="center"
        justifyContent="between"
      >
        {!isMobile && (
          <SearchInput
            {...{
              value: searchValue,
              setValue: setSearchValue,
              debounce: true,
            }}
          />
        )}
        {isMobile && (
          <Icon
            className="w-[40px] h-[40px] !p-2 border"
            onClick={() => {
              setShowSearch((prev) => !prev);
            }}
          >
            <MagnifyingGlassIcon color="gray" />
          </Icon>
        )}
        <Stack className="gap-2" direction="row">
          {options.map((item) => (
            <Button
              key={item.key}
              className="w-full !px-2"
              text={item.title}
              variant={item.key == selectedOption ? 'default' : 'primary'}
              onClick={() => {
                setSelectedOption(item.key);
              }}
            />
          ))}
        </Stack>
        {!isTablet && (
          <Button
            text={t('Boards.createBoard.title')}
            onClick={() => {
              toggleCreateBoardModal(true);
            }}
          />
        )}
        {isTablet && (
          <Stack
            className="w-[60px] h-[60px] absolute right-8 bottom-8 bg-green-700 !hover:bg-green-800 rounded-full shadow-lg"
            justifyContent="center"
            onClick={() => {
              toggleCreateBoardModal(true);
            }}
          >
            <Icon size="lg" hoverable={false}>
              <PlusIcon color="white" />
            </Icon>
          </Stack>
        )}
      </Stack>
      {isMobile && showSearch && (
        <Stack className="w-full h-[60px] px-3 py-1 bg-white border-b shadow-sm">
          <SearchInput
            {...{
              className: 'w-full',
              value: searchValue,
              setValue: setSearchValue,
              debounce: true,
            }}
          />
        </Stack>
      )}
    </>
  );
};
