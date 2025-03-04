import { t } from 'i18next';
import { Stack } from '../../../components/basic/Stack/Stack';
import { TicketMarkers } from './TicketMarkers';
import { TicketDates } from './TicketDates';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';
import { ticketType } from '../../../common/typing';
import { defaultTextStyle } from '../../../common/styles';
import { TicketMember } from './TicketMember';

export const TicketDetails = ({ data }: { data: ticketType | undefined }) => {
  const { openTicketData } = useStateProvider().state.board;
  return (
    <ProgressPanel isLoading={!openTicketData}>
      <Stack
        className="h-full w-full p-2 gap-4 border-[1px]"
        direction="col"
        alignItems="start"
      >
        <Stack
          className="w-full h-fit p-1 rounded-md border-b"
          direction="row"
          alignItems="center"
        >
          <p className={defaultTextStyle}>
            {t('Tickets.groupBtn')} {data?.groupName || t('Groups.ungrouped')}
          </p>
        </Stack>
        <TicketMember />
        <TicketMarkers />
        <TicketDates />
      </Stack>
    </ProgressPanel>
  );
};
