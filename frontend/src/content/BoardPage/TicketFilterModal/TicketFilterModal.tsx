import { t } from 'i18next';
import { Modal } from '../../../components/basic/Modal';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { Stack } from '../../../components/basic/Stack/Stack';
import { UserFilter } from './UserFilter';
import { MarkerFilter } from './MarkerFilter';
import { Button } from '../../../components/basic/Button';

export const TicketFilterModal = () => {
  const { state, actions } = useStateProvider();
  const { showTicketFilters } = state.ticket;
  const { setShowTicketFilters, setFilterMarkers, setFilterMembers } = actions;

  const clearFilters = () => {
    setFilterMarkers([]);
    setFilterMembers([]);
  };

  return (
    <Modal
      title={t('filter.title')}
      isVisible={!!showTicketFilters}
      onClose={() => {
        setShowTicketFilters(false);
      }}
      onAccept={() => {}}
      showButtons={false}
    >
      <Stack className="w-full gap-2" direction="col">
        <UserFilter />
        <MarkerFilter />
        <Button
          {...{
            text: 'Clear',
            onClick: clearFilters,
            className: 'ml-auto mt-5',
          }}
        />
      </Stack>
    </Modal>
  );
};
