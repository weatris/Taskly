import Stack from '../../components/Stack/Stack';
import { Icon } from '../../images/Icon';
import { EllipsisHorizontalIcon } from '../../images/icons';

export const WorkPlace = ({ id }: { id: string }) => {
  return (
    <Stack className="w-full h-full" direction="col" alignItems="start">
      <Stack
        className="w-full h-[50px] relative">
      <Stack
        className="w-full h-full absolute border-b px-4 py-2"
        justifyContent="between"
      >
        <div className="w-full h-full overflow-hidden">
          <p className="text-2xl truncate">WorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlaceWorkPlace: {id}</p>
        </div>
        <Icon className="!w-10 px-1 bg-green-700 hover:bg-green-800">
          <EllipsisHorizontalIcon color="white" />
        </Icon>
      </Stack>
      </Stack>
      <Stack className="w-full h-full p-4" direction="col" alignItems="start">
        Chat and Boards as tabs
      </Stack>
    </Stack>
  );
};
