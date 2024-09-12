import { t } from 'i18next';
import Stack from './Stack/Stack';
import classNames from 'classnames';

export const AccessTypeBadge = ({
  tp,
  className,
}: {
  tp: 'public' | 'private' | 'closed' | undefined;
  className?: string;
}) => {
  if (!tp) {
    return <></>;
  }

  return (
    <Stack
      className={classNames(
        'px-2 py-[2px] bg-white border rounded-lg cursor-default',
        className,
      )}
      direction="row"
      justifyContent="center"
    >
      {t(`accessTypes.${tp}`)}
    </Stack>
  );
};
