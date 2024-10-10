import { useParams } from 'react-router-dom';
import { tickets } from '../../mock';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';

export const Board = () => {
  const { id = '' } = useParams();

  //todo fix id is undefined when inside of useApiQuery
  const { data, isLoading, isError } = useApiQuery('getBoardById', [{ id }]);
  const groupTypes = data?.config.groupTypes || [];

  const ticketData = groupTypes.map((groupType) => ({
    groupId: groupType.id,
    groupName: groupType.name,
    tickets: tickets.filter((ticket) => ticket.group === groupType.id),
  }));

  return (
    <ProgressPanel {...{ isLoading, isError }}>
      <Stack className="w-full h-full" direction="col">
        <Stack className="w-full h-[50px] min-h-[50px] px-3 border-b">
          <p>{data?.name}</p>
        </Stack>
        <Stack
          className="w-full h-full overlow-x-auto p-4 gap-3"
          direction="row"
          alignItems="start"
          justifyContent="start"
        >
          <>
            {ticketData.map((item) => (
              <Stack
                key={item.groupId}
                className="w-[260px] min-h-[30px] bg-gray-200 rounded-lg border shadow-md px-2 pb-2 gap-2"
                direction="col"
              >
                <p className="leading-[30px] text-lg">{item.groupName}</p>
                {item.tickets.map((ticket) => (
                  <Stack
                    key={ticket.id}
                    className="w-full h-[40px] bg-white rounded-lg px-1 border cursor-pointer hover:border-gray-400"
                    direction="col"
                    alignItems="start"
                  >
                    {ticket.name}
                  </Stack>
                ))}
              </Stack>
            ))}
          </>
        </Stack>
      </Stack>
    </ProgressPanel>
  );
};
