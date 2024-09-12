import { Icon } from '../images/Icon';
import { ArrowPathIcon } from '../images/icons';
import Stack from './Stack/Stack';

export const Spinner = () => {
  return (
    <Stack
      className="w-full h-full"
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Icon className="w-[50px] h-[50px] animate-spin" hoverable={false}>
        <ArrowPathIcon color="lightgray" />
      </Icon>
    </Stack>
  );
};
