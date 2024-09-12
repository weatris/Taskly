import { t } from 'i18next';
import { AccessTypeBadge } from '../../components/AccessTypeBadge';
import { Button } from '../../components/Button';
import Stack from '../../components/Stack/Stack';
import { Tabs, TabType } from '../../components/Tabs';
import { Icon } from '../../images/Icon';
import { EllipsisHorizontalIcon } from '../../images/icons';
import { workplaces } from '../../mock';
import { ChatTab } from './ChatTab/ChatTab';

export const WorkPlace = ({ id }: { id: string }) => {
  // todo: make api call to get all WorkPlace data (boards list included)
  const data = workplaces.find((item) => item.id == id);

  // first tab is chat, next are boards (max 5)
  const tabs: TabType[] = [
    {
      title: t('WorkPlaces.tabs.chat'),
      path: `/workplaces/${id}`,
      component: <ChatTab />,
    },
    {
      title: 'tester 1',
      path: `/workplaces/${id}/board`,
      component: <>rere</>,
    },
    {
      title: 'tester',
      path: `/workplaces/${id}/player`,
      component: <>tete</>,
    },
  ];

  return (
    <Stack className="w-full h-full" direction="col" alignItems="start">
      <Stack
        className="w-full h-[120px] min-h-[120px] relative"
        direction="col"
      >
        <Stack className="w-full h-full absolute px-4 pt-2" direction="col">
          <Stack
            className="w-full h-full"
            direction="row"
            alignItems="start"
            justifyContent="between"
          >
            <Stack
              className="w-full overflow-hidden gap-2"
              direction="row"
              alignItems="center"
            >
              <p className="text-2xl truncate">{data?.name}</p>{' '}
              <AccessTypeBadge tp={data?.type} />
            </Stack>
            <Icon className="!w-10 px-1 border border-gray-200">
              <EllipsisHorizontalIcon />
            </Icon>
          </Stack>
          <Stack
            className="w-full"
            direction="row"
            alignItems="center"
            justifyContent="end"
          >
            <Button text="create Board" />
          </Stack>
        </Stack>
      </Stack>
      <Tabs tabs={tabs} />
    </Stack>
  );
};
