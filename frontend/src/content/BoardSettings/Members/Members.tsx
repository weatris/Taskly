import { Stack } from '../../../components/basic/Stack/Stack';
import { t } from 'i18next';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { permissionLevels } from '../../../common/typing';
import { MembersItem } from './MembersItem';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';
import { ShareBoardButton } from '../../../components/ShareBoardButton';
import classNames from 'classnames';
import { useScreenDetector } from '../../../utils/useScreenDetector';

export const Members = () => {
  const { state } = useStateProvider();
  const { isMobile } = useScreenDetector();
  const { boardData: data, userAccess } = state.board;

  const membersSorted = [...(data?.members || [])].sort(
    (a, b) =>
      permissionLevels.indexOf(b.level) - permissionLevels.indexOf(a.level),
  );

  return (
    <ProgressPanel {...{ isLoading: !data?.id }}>
      <Stack
        className={classNames(
          'h-full p-2 gap-2 border-l',
          isMobile ? 'w-full' : 'min-w-[350px]',
        )}
        direction="col"
      >
        <p className="text-xl">{t('Board.settings.members.header')}</p>
        <Stack className="w-full h-full relative" direction="col">
          <Stack
            className="w-full h-full min-h-[120px] absolute p-2 py-3 overflow-y-auto gap-5"
            direction="col"
          >
            {membersSorted.map((item) => (
              <MembersItem key={item.id} {...{ item }} />
            ))}
          </Stack>
        </Stack>
        <ShareBoardButton
          {...{
            id: data?.id,
            userAccess,
            className: 'w-full',
          }}
        />
      </Stack>
    </ProgressPanel>
  );
};
