import Stack from '../../../components/Stack/Stack';
import { t } from 'i18next';
import { Button } from '../../../components/Button';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { permissionLevels } from '../../../common/typing';
import { MembersItem } from './MembersItem';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';

export const Members = () => {
  const { state, actions } = useStateProvider();
  const { setShareBoardId } = actions;
  const { boardData: data } = state.board;

  const membersSorted = [...(data?.members || [])].sort(
    (a, b) =>
      permissionLevels.indexOf(b.level) - permissionLevels.indexOf(a.level),
  );

  return (
    <ProgressPanel {...{ isLoading: !data?.id }}>
      <Stack className="w-[400px] h-full p-2 gap-2 border-l" direction="col">
        <p className="text-xl">{t('Board.settings.members.header')}</p>
        <Stack className="w-full h-full relative" direction="col">
          <Stack
            className="w-full h-full absolute p-2 py-3 overflow-y-auto gap-5"
            direction="col"
          >
            {membersSorted.map((item) => (
              <MembersItem key={item.id} {...{ item }} />
            ))}
          </Stack>
        </Stack>
        <Button
          {...{
            className: 'w-full',
            text: t('Board.share'),
            onClick: () => {
              data?.id && setShareBoardId(data?.id);
            },
          }}
        />
      </Stack>
    </ProgressPanel>
  );
};
