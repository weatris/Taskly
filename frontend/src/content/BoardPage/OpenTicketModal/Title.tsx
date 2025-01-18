import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { EditableName } from '../../../components/EditableName';
import Stack from '../../../components/Stack/Stack';
import { useNotification } from '../../../stateProvider/notification/useNotification';

export const Title = ({ data }: { data: ticketType | undefined }) => {
  const [value, setValue] = useState(data?.name || '');
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();

  const { mutate: handleRename, isLoading } = useApiMutation('renameTicket', {
    onSuccess: () => {
      invalidateQuery('getTicketById');
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('Tickets.errors.cantUpdate'),
        tp: 'alert',
      });
      setValue(data?.name || '');
    },
  });

  useEffect(() => {
    setValue(data?.name || '');
  }, [data?.name]);

  if (!data) {
    return <></>;
  }

  const handleSave = () => {
    handleRename({ id: data.id, newValue: value });
  };

  return (
    <Stack
      className="h-full h-[40px] gap-2 [&>div]:w-full"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <EditableName
        {...{
          value,
          setValue,
          initValue: value,
          isLoading,
          onClickAway: handleSave,
          className: 'w-full bg-transparent border-none shadow-none',
        }}
      />
    </Stack>
  );
};
