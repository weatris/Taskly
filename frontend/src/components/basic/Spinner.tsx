import { Icon } from '../../images/Icon';
import { ArrowPathIcon } from '../../images/icons';
import { Stack } from './Stack/Stack';

export const Spinner = ({ size = 'lg' }: { size?: 'md' | 'sm' | 'lg' }) => {
  return (
    <Stack
      className="w-full h-full"
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Icon className="animate-spin" hoverable={false} size={size}>
        <ArrowPathIcon color="lightgray" />
      </Icon>
    </Stack>
  );
};
