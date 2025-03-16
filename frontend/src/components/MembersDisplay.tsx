import { t } from 'i18next';
import { membersToDisplayLimit } from '../common/constants';
import { memberType } from '../common/typing';
import { Avatar } from './basic/Avatar';

const textSize = {
  sm: 'text-sm',
  md: 'text-normal',
};

export const MembersDisplay = ({
  membersToDisplay,
  size = 'md',
}: {
  membersToDisplay: memberType[];
  size?: 'sm' | 'md';
}) => {
  return (
    <>
      {membersToDisplay.slice(0, membersToDisplayLimit).map((userData) => (
        <Avatar key={userData.id} {...{ userData, size }} />
      ))}
      {membersToDisplay.length > membersToDisplayLimit && (
        <p className={textSize[size]}>
          {t('Tickets.membersMore', {
            amount: membersToDisplay.length - membersToDisplayLimit,
          })}
        </p>
      )}
    </>
  );
};
