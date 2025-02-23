import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { EditableName } from '../../../components/EditableName';
import { Stack } from '../../../components/Stack/Stack';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { ticketType } from '../../../common/typing';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { permissionControl } from '../../../utils/permissionControl';

export const Title = ({ data }: { data: ticketType | undefined }) => {
  const [value, setValue] = useState(data?.name || '');
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();
  const { userAccess } = useStateProvider().state.board;

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
          isEditable: permissionControl({ userAccess, key: 'editTicket' }),
          className: 'w-full bg-transparent border-none shadow-none',
        }}
      />
    </Stack>
  );
};
