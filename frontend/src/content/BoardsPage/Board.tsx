import { useNavigate, useParams } from 'react-router-dom';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { Button } from '../../components/Button';
import { t } from 'i18next';
import { ButtonInputForm } from './ButtonInputForm';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { generateRandomId } from '../../utils/utils';
import { TicketGroup } from './TicketGroup';

export const Board = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const { data, isLoading, isError, refetch } = useApiQuery('getBoardById', [
    { id },
  ]);

  const { mutate } = useApiMutation('updateConfig', {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      addNotification({
        title: t('Errors.default'),
        tp: 'alert',
      });
    },
  });

  const onCreateNewGroup = (listName: string) => {
    if (listName) {
      mutate({
        id,
        config: {
          ...data?.config,
          groupTypes: [
            ...(data?.config.groupTypes || []),
            {
              id: generateRandomId(10),
              name: listName,
            },
          ],
        },
      });
    }
  };

  const groupTypes = data?.config.groupTypes || [];

  const ticketData = groupTypes.map((groupType) => ({
    groupId: groupType.id,
    groupName: groupType.name,
    tickets:
      data?.tickets.filter((ticket) => ticket.groupId === groupType.id) || [],
  }));

  console.log(ticketData);

  return (
    <>
      <ProgressPanel {...{ isLoading, isError }}>
        <Stack className="w-full h-full" direction="col">
          <Stack
            className="w-full h-[60px] min-h-[60px] px-3 py-2 border-b"
            justifyContent="between"
          >
            <p>{data?.name}</p>
            <Button
              {...{
                text: t('Boards.settings'),
                onClick: () => {
                  navigate('settings');
                },
              }}
            />
          </Stack>
          {!!data && (
            <Stack
              className="w-full h-full overlow-x-auto p-4 gap-3"
              direction="row"
              alignItems="start"
              justifyContent="start"
            >
              <>
                {ticketData.map((item) => (
                  <TicketGroup {...{ item, boardData: data, refetch }} />
                ))}
              </>
              <ButtonInputForm
                {...{ onAccept: onCreateNewGroup, text: t('Board.createList') }}
              />
            </Stack>
          )}
        </Stack>
      </ProgressPanel>
    </>
  );
};
