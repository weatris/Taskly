import { useNavigate } from 'react-router-dom';
import Stack from '../../components/Stack/Stack';
import { useApiMutation } from '../../api/useApiMutation';
import { useInvalidateQuery } from '../../api/useInvalidateQuery';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { Icon } from '../../images/Icon';
import { ChevronDownIcon, ChevronUpIcon } from '../../images/icons';

export const TicketRowItem = ({
  ticket,
  position,
}: {
  ticket: ticketType;
  position: '' | 'first' | 'last' | 'only';
}) => {
  const navigate = useNavigate();
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();

  const { mutate: mutatechangeOrder } = useApiMutation('changeOrder', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('Order.cantChangeOrder'),
        tp: 'alert',
      });
    },
  });

  return (
    <Stack
      className="w-full min-h-[40px] bg-white rounded-lg border cursor-pointer hover:border-gray-400"
      direction="row"
      alignItems="center"
      onClick={() => {
        navigate(`tickets/${ticket.id}`);
      }}
    >
      <Stack className="w-full">
        <p className="leading-[40px] px-2">{ticket.name}</p>
      </Stack>
      {position !== 'only' && (
        <Stack
          className="h-full pr-1"
          direction="col"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {position !== 'first' && (
            <Icon
              size="sm"
              onClick={() => {
                mutatechangeOrder({
                  id: ticket.id,
                  order: ticket.order - 1,
                });
              }}
            >
              <ChevronUpIcon />
            </Icon>
          )}
          {position !== 'last' && (
            <Icon
              size="sm"
              onClick={() => {
                mutatechangeOrder({
                  id: ticket.id,
                  order: ticket.order + 1,
                });
              }}
            >
              <ChevronDownIcon />
            </Icon>
          )}
        </Stack>
      )}
    </Stack>
  );
};
