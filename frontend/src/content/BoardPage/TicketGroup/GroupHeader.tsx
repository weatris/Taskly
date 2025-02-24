import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { Dropdown, dropdownItemType } from '../../../components/basic/Dropdown';
import { Stack } from '../../../components/basic/Stack/Stack';
import { Icon } from '../../../images/Icon';
import { ticketGroupType } from '../../../common/typing';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { t } from 'i18next';
import classNames from 'classnames';

export const GroupHeader = ({ item }: { item: ticketGroupType }) => {
  const { actions } = useStateProvider();
  const { setUpdateGroupId, setDeleteGroupId } = actions;

  const items: dropdownItemType[] = [
    {
      content: t('Groups.updateGroup'),
      onClick: () => {
        setUpdateGroupId(item.groupId);
      },
    },
    {
      content: <p className="text-red-700">{t('Groups.deleteGroup')}</p>,
      onClick: () => {
        setDeleteGroupId(item.groupId);
      },
    },
  ];

  return (
    <Stack
      className={classNames(
        'w-[260px] h-[40px] flex flex-row items-center rounded-lg border shadow-md gap-2 p-2',
        item.groupId ? 'bg-gray-200' : 'bg-gray-300',
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <p className="w-full truncate">{item.groupName}</p>
      {!!item.groupId && (
        <Dropdown
          label={
            <Icon>
              <EllipsisHorizontalIcon color="gray" />
            </Icon>
          }
          items={items}
        />
      )}
    </Stack>
  );
};
