import { Stack } from '../../../components/basic/Stack/Stack';

export const ChatTab = () => {
  const pinnedMessage = 'this is pinned message';

  return (
    <Stack className="w-full h-full" direction="row">
      <Stack className="w-full h-full border-r">
        {!!pinnedMessage && (
          <Stack className="w-full h-full" direction="col">
            <Stack
              className="w-full h-[60px] bg-gray-50 text-lg pl-2 border-b"
              direction="row"
              alignItems="center"
            >
              {pinnedMessage}
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack className="w-[500px] min-w-[200px]">
        <></>
      </Stack>
    </Stack>
  );
};
