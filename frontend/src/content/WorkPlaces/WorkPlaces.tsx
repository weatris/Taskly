import { useState } from 'react';
import { SearchInput } from '../../components/SearchInput';
import Stack from '../../components/Stack/Stack';
import { workplaces } from '../../mock';
import { Icon } from '../../images/Icon';
import { LockClosedIcon } from '../../images/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import { Button } from '../../components/Button';
import { WorkPlace } from './WorkPlace';

export const WorkPlaces = () => {
  const [search, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  //todo: use search param for api call
  const data = [
    ...workplaces.map((item) => ({ ...item, newChanges: 2 })),
  ] as (WorkPlaceType & { newChanges?: number })[];

  return (
    <Stack className="w-full h-full" direction="col">
      <Stack className="w-full h-full">
        <Stack
          className="w-[320px] min-w-[320px] h-full border-r overflow-y-auto"
          direction="col"
        >
          <Stack
            className="w-full h-[50px] min-h-[50px] border-b"
            direction="row"
            alignItems="center"
            justifyContent="between"
          >
            <SearchInput
              value={search}
              setValue={setSearchValue}
              className="w-full h-full border-none bg-gray-50 [&>div>input]:bg-gray-50"
              debounce={true}
            />
          </Stack>
          <Stack className="w-full h-full" direction="col">
            {data.map((item) => {
              return (
                <Stack
                  className="w-full h-[60px] p-2 cursor-pointer border-b border-gray-100 hover:bg-gray-100"
                  direction="row"
                  alignItems="start"
                  onClick={() => {
                    navigate(`/workplaces/${item.id}`);
                  }}
                >
                  <div className="w-full text-lg truncate">{item.name}</div>
                  {item.type === 'private' && (
                    <Icon hoverable={false}>
                      <LockClosedIcon className="w-5 h-4" color="gray" />
                    </Icon>
                  )}
                </Stack>
              );
            })}
          </Stack>
          <div className="w-full p-1 border-t">
            <Button
              className="w-full"
              text={'create workplace'}
              onClick={() => {}}
            />
          </div>
        </Stack>
        <Stack
          className="w-full h-full"
          direction="row"
          alignItems="start"
          justifyContent="start"
        >
          {!!id ? <WorkPlace {...{ id }} /> : <></>}
        </Stack>
      </Stack>
    </Stack>
  );
};
