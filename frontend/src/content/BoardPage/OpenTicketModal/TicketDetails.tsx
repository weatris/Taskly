import { t } from 'i18next';
import Stack from '../../../components/Stack/Stack';
import { TicketMarkers } from './TicketMarkers';
import { TicketDates } from './TicketDates';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';

export const TicketDetails = ({ data }: { data: ticketType | undefined }) => {
  const { openTicketData } = useStateProvider().state.board;
  return (
    <ProgressPanel isLoading={!openTicketData}>
      <Stack
        className="w-[400px] !min-w-[400px] !max-w-[400px] h-full p-2 gap-2 border-[1px]"
        direction="col"
        alignItems="start"
      >
        <Stack
          className="w-full h-fit p-1 rounded-md border-b"
          direction="row"
          alignItems="center"
        >
          <p className="truncate">
            {t('Tickets.groupBtn')} {data?.groupName}
          </p>
        </Stack>
        <TicketMarkers />
        <TicketDates />
      </Stack>
    </ProgressPanel>
  );
};
