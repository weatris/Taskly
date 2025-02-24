import { t } from 'i18next';
import { Stack } from './basic/Stack/Stack';
import classNames from 'classnames';
import { boardAccessType } from '../common/typing';

export const AccessTypeBadge = ({
  tp,
  className,
}: {
  tp?: boardAccessType | 'all';
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
