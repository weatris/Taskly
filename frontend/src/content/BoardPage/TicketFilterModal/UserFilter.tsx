import { MultipleSelect } from '../../../components/basic/MultipleSelect';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { Avatar } from '../../../components/basic/Avatar';
import { Stack } from '../../../components/basic/Stack/Stack';
import { t } from 'i18next';

export const UserFilter = () => {
  const { state, actions } = useStateProvider();
  const data = state.board?.boardData?.members || [];
  const { filterMembers: selected = [] } = state.ticket;
  const { setFilterMembers: setSelected } = actions;

  const onSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const dataToDisplay = data.filter((item) => selected.includes(item.id));

  return (
    <MultipleSelect
      {...{
        selected,
        items: [{ id: '', name: t('filter.withoutMember') }, ...data],
        onSelect,
        placeholder: t('filter.selectMembers'),
      }}
    >
      <Stack
        className="w-full max-h-[80px] overflow-auto scrollbar-thin gap-1"
        direction="row"
        wrap="wrap"
      >
        {dataToDisplay.map((item) => (
          <Avatar userData={item} size="sm" canHover={false} />
        ))}
      </Stack>
    </MultipleSelect>
  );
};
