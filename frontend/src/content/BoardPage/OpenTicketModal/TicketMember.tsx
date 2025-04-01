import { t } from 'i18next';
import { Button } from '../../../components/basic/Button';
import { Stack } from '../../../components/basic/Stack/Stack';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { useState } from 'react';
import { ManageMembersModal } from './ManageMembersModal';
import { MembersDisplay } from '../../../components/MembersDisplay';
import { useScreenDetector } from '../../../utils/useScreenDetector';
import classNames from 'classnames';

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
  const { isMediumScreen } = useScreenDetector();

  return (
    <>
      <Stack className="w-full" direction="col">
        <Stack
          className={classNames(
            'w-full gap-2',
            membersToDisplay.length && 'pb-2',
          )}
          direction="row"
        >
          <MembersDisplay {...{ membersToDisplay }} />
        </Stack>
        <Stack
          className={classNames(
            'w-full gap-2',
            !isMediumScreen && '[&>button]:w-full',
          )}
          direction="row"
          justifyContent={'end'}
        >
          <Button
            {...{
              text: t('Tickets.manageMembers'),
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
