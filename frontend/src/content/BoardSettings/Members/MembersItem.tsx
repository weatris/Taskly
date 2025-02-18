import { t } from 'i18next';
import { memberType } from '../../../common/typing';
import { Options, optionType } from '../../../components/Options';
import Stack from '../../../components/Stack/Stack';
import { useStateProvider } from '../../../stateProvider/useStateProvider';

export const MembersItem = ({ item }: { item: memberType }) => {
  const { state, actions } = useStateProvider();
  const { setUserToExclude, setUserInfo } = actions;
  const { boardData } = state.board;
  const { id } = state.auth;

  // todo: make functions that take member data and decide if user can perform some actions
  const canExclude =
    item.id !== id &&
    boardData?.members.find((item) => item.id === id)?.level == 'owner';

  const optionsList: optionType[] = [
    {
      text: t('Board.settings.members.infoTitle'),
      onClick: () => {
        setUserInfo(item.id);
      },
    },
    ...(canExclude
      ? [
          {
            text: t('Board.settings.members.excludeTitle'),
            classNames: 'text-red-700',
            onClick: () => {
              setUserToExclude(item.id);
            },
          },
        ]
      : []),
  ];

  return (
    <Stack
      className="w-full h-[50px] relative p-2 border"
      direction="row"
      justifyContent="between"
    >
      {item.name}
      <p className="absolute left-[-4px] top-[-12px] px-1 bg-gray-100 border rounded-lg">
        {item.level}
      </p>
      <Options items={optionsList} />
    </Stack>
  );
};
