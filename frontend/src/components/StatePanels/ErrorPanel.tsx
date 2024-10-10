import { t } from 'i18next';
import { Icon } from '../../images/Icon';
import { ExclamationTriangleIcon } from '../../images/icons';
import { Button } from '../Button';
import Stack from '../Stack/Stack';

export const ErrorPanel = ({
  errorText = t('Errors.default'),
  isRefresh = true,
}: {
  errorText?: string;
  isRefresh?: boolean;
}) => {
  return (
    <Stack
      className="w-full h-full bg-gray-50"
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        className="p-4 rounded-lg bg-white shadow-md border"
        direction="col"
        alignItems="center"
        justifyContent="center"
      >
        <Icon className="w-[120px] h-[120px]" hoverable={false}>
          <ExclamationTriangleIcon color="lightgray" />
        </Icon>
        <p className="text-xl text-gray-400">{errorText}</p>
        {!!isRefresh && (
          <Button
            className="mt-2"
            text={t('common.refresh')}
            onClick={() => {}}
          />
        )}
      </Stack>
    </Stack>
  );
};
