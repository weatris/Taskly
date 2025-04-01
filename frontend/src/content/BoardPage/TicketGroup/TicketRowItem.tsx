import { useNavigate } from 'react-router-dom';
import { Stack } from '../../../components/basic/Stack/Stack';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { ticketType } from '../../../common/typing';
import { MembersDisplay } from '../../../components/MembersDisplay';
import { MarkerDisplay } from '../../../components/MarkerDisplay';
import { formatDate } from '../../../utils/formatDate';

export const TicketRowItem = ({ ticket }: { ticket: ticketType }) => {
  const navigate = useNavigate();
  const { boardData, markers } = useStateProvider().state.board;
  const ticketMarkers = markers.filter((item) =>
    ticket.markers.includes(item.id),
  );

  const membersToDisplay =
    boardData?.members.filter((item) => ticket.assignedTo?.includes(item.id)) ||
    [];

  return (
    <Stack
      className="w-full min-h-[40px] bg-white rounded-lg border cursor-pointer hover:border-gray-400"
      direction="row"
      alignItems="center"
      onClick={() => {
        navigate(`tickets/${ticket.id}`);
      }}
    >
      <Stack className="w-full" direction="col" alignItems="start">
        {!!ticketMarkers.length && (
          <Stack
            className="w-full h-[20px] overflow-hidden px-1 pt-1 gap-2"
            direction="row"
            alignItems="center"
          >
            <MarkerDisplay {...{ ticketMarkers, size: 'small' }} />
          </Stack>
        )}
        <p className="leading-[40px] px-2">{ticket.name}</p>
        {!!(ticket.startDate || ticket.endDate) && (
          <Stack
            className="w-full px-2 gap-1 text-sm mr-auto"
            direction="row-reverse"
          >
            <p className="mr-auto">
              {formatDate(ticket.startDate)} - {formatDate(ticket.endDate)}
            </p>
          </Stack>
        )}
        {!!membersToDisplay.length && (
          <Stack className="w-full p-1 gap-1" direction="row-reverse">
            <MembersDisplay {...{ membersToDisplay, size: 'sm' }} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
