import { t } from 'i18next';
import { permissionControl } from '../utils/permissionControl';
import { Button } from './basic/Button';
import { useStateProvider } from '../stateProvider/useStateProvider';
import { userAccessType } from '../common/typing';
import { ShareIcon } from '../images/icons';

export const ShareBoardButton = ({
  id,
  userAccess,
  className,
}: {
  id?: string;
  userAccess: userAccessType;
  className?: string;
}) => {
  const { actions } = useStateProvider();
  const { setShareBoardId } = actions;

  return (
    <>
      {permissionControl({ userAccess, key: 'boardShare' }) && (
        <Button
          {...{
            text: t('Board.share'),
            icon: <ShareIcon />,
            className,
            onClick: () => {
              id && setShareBoardId(id);
            },
          }}
        />
      )}
    </>
  );
};
