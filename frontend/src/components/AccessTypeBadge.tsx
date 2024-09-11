import { t } from 'i18next';
import Stack from './Stack/Stack';

export const AccessTypeBadge = ({
  tp,
}: {
  tp: 'public' | 'private' | 'closed' | undefined;
}) => {
  if (!tp) {
    return <></>;
  }

  return (
    <Stack
      className="px-1 border rounded-lg cursor-default"
      direction="row"
      justifyContent="center"
    >
      {t(`accessTypes.${tp}`)}
    </Stack>
  );
};
