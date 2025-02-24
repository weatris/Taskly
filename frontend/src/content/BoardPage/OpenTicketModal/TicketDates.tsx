import { useEffect, useState } from 'react';
import { Stack } from '../../../components/basic/Stack/Stack';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { DatePicker } from '../../../components/basic/Datepicker';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';
import { Button } from '../../../components/basic/Button';
import { t } from 'i18next';
import { useApiMutation } from '../../../api/useApiMutation';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { dateType } from '../../../common/typing';
import { permissionControl } from '../../../utils/permissionControl';

export const TicketDates = () => {
  const { openTicketData, userAccess } = useStateProvider().state.board;
  const [startDate, setStartDate] = useState<dateType>(
    openTicketData?.startDate,
  );
  const [endDate, setEndDate] = useState<dateType>(openTicketData?.endDate);
  const invalidateQuery = useInvalidateQuery();

  const { addNotification } = useNotification();
  const { mutate, isLoading } = useApiMutation('setDates', {
    onSuccess: () => {
      invalidateQuery('getTicketById');
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('Tickets.errors.cantUpdate'),
        tp: 'info',
      });
    },
  });

  const onSubmit = () => {
    openTicketData?.id &&
      mutate({
        id: openTicketData?.id,
        startDate,
        endDate,
      });
  };

  useEffect(() => {
    setStartDate(openTicketData?.startDate);
    setEndDate(openTicketData?.endDate);
  }, [openTicketData?.startDate, openTicketData?.endDate]);

  const isChanged =
    openTicketData?.startDate !== startDate ||
    openTicketData?.endDate !== endDate;

  return (
    <Stack className="w-full h-[40px]" justifyContent="between">
      <ProgressPanel {...{ isLoading: !openTicketData || isLoading }}>
        <Stack className="w-full gap-2" justifyContent="between">
          <DatePicker
            disabled={!permissionControl({ userAccess, key: 'editTicket' })}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            placeholderText={t('Tickets.startDate')}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
          <DatePicker
            disabled={!permissionControl({ userAccess, key: 'editTicket' })}
            selected={endDate}
            startDate={startDate}
            endDate={endDate}
            placeholderText={t('Tickets.endDate')}
            onChange={(date) => {
              setEndDate(date);
            }}
          />
          {isChanged && (
            <Button
              {...{ text: t('common.save'), size: 'sm', onClick: onSubmit }}
            />
          )}
        </Stack>
      </ProgressPanel>
    </Stack>
  );
};
