import { t } from 'i18next';
import { Button } from '../../../components/basic/Button';
import { Stack } from '../../../components/basic/Stack/Stack';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { useState } from 'react';
import { ManageMembersModal } from './ManageMembersModal';
import { MembersDisplay } from '../../../components/MembersDisplay';

export const TicketMember = () => {
  const [showMembersModal, setShowMembersModal] = useState(false);
  const invalidateQuery = useInvalidateQuery();
  const { state } = useStateProvider();
  const { id } = state.auth;
  const { boardData } = state.board;
  const { openTicketData } = state.ticket;

  const { mutate } = useApiMutation('manageTicketMembers', {
    onSuccess: () => {
      invalidateQuery('getBoardById');
      invalidateQuery('getTicketById');
      setShowMembersModal(false);
    },
  });

  const editTicketMembers = (newValue: string[]) => {
    if (openTicketData?.id)
      mutate({
        id: openTicketData?.id,
        newValue,
      });
  };

  const onManageMembers = () => {
    if (id) {
      const currentMembers = openTicketData?.assignedTo || [];
      if (currentMembers.includes(id))
        editTicketMembers(currentMembers.filter((item) => item !== id));
      else editTicketMembers([...currentMembers, id]);
    }
  };

  const membersToDisplay =
    boardData?.members.filter((item) =>
      openTicketData?.assignedTo?.includes(item.id),
    ) || [];

  const isUserInMembers = membersToDisplay.map((item) => item.id).includes(id);

  return (
    <>
      <Stack className="w-full" direction="col">
        <Stack className="w-full gap-2 pb-2" direction="row">
          <MembersDisplay {...{ membersToDisplay }} />
        </Stack>
        <Stack className="w-full gap-2" direction="row">
          <Button
            {...{
              text: t('Tickets.manageMembers'),
              className: 'w-full',
              variant: 'primary',
              onClick: () => {
                setShowMembersModal(true);
              },
            }}
          />
          <Button
            {...{
              text: isUserInMembers
                ? t('Tickets.leaveTicket')
                : t('Tickets.joinTicket'),
              className: 'w-full',
              onClick: onManageMembers,
              variant: isUserInMembers ? 'primary' : 'default',
            }}
          />
        </Stack>
      </Stack>
      {showMembersModal && (
        <ManageMembersModal
          {...{ showMembersModal, setShowMembersModal, editTicketMembers }}
        />
      )}
    </>
  );
};
