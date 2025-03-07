import { MultipleSelect } from '../../../components/basic/MultipleSelect';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { Stack } from '../../../components/basic/Stack/Stack';
import { t } from 'i18next';
import { MarkerBadge } from '../../../components/Markers/MarkerBadge';

export const MarkerFilter = () => {
  const { state, actions } = useStateProvider();
  const data = state.board?.markers || [];
  const { filterMarkers: selected = [] } = state.ticket;
  const { setFilterMarkers: setSelected } = actions;

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
        items: [
          {
            id: '',
            name: t('filter.withoutMarker'),
            color: 'white',
            boardId: '',
            description: '',
          },
          ...data,
        ],
        onSelect,
        placeholder: t('filter.selectMarkers'),
      }}
    >
      <Stack
        className="w-full max-h-[80px] overflow-auto scrollbar-thin gap-1"
        direction="row"
        wrap="wrap"
      >
        {dataToDisplay.map((item) => (
          <MarkerBadge {...{ item }} />
        ))}
      </Stack>
    </MultipleSelect>
  );
};
