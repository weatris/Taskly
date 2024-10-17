import { t } from 'i18next';
import { Icon } from '../../images/Icon';
import { InformationCircleIcon } from '../../images/icons';
import Stack from '../Stack/Stack';

export const InfoPanel = ({
  text = t('common.nothingFound'),
}: {
  text?: string;
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
          <InformationCircleIcon color="lightgray" />
        </Icon>
        <p className="text-xl text-gray-400">{text}</p>
      </Stack>
    </Stack>
  );
};
