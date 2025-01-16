import Stack from '../../components/Stack/Stack';
import { TicketMarkers } from './TicketMarkers';

export const BoardSettings = () => {
  return (
    <Stack className="w-full h-full" direction="row">
      <TicketMarkers />
    </Stack>
  );
};
