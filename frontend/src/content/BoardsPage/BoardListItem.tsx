import classNames from 'classnames';
import { defaultTextStyle } from '../../common/styles';
import { boardType } from '../../common/typing';
import { AccessTypeBadge } from '../../components/AccessTypeBadge';
import { Stack } from '../../components/basic/Stack/Stack';
import { useNavigate } from 'react-router-dom';
import { useScreenDetector } from '../../utils/useScreenDetector';
import { Icon } from '../../images/Icon';
import { ArrowRightIcon } from '../../images/icons';

export const BoardListItem = ({ item }: { item: boardType }) => {
  const { isMobile } = useScreenDetector();

  if (isMobile) {
    return <BoardListItemMobile {...{ item }} />;
  }

  return <BoardListItemDesktop {...{ item }} />;
};

const BoardListItemDesktop = ({ item }: { item: boardType }) => {
  const navigate = useNavigate();

  return (
    <Stack
      className="w-[200px] h-[300px] min-w-[200px] min-h-[300px] relative border rounded-lg shadow-sm cursor-pointer"
      direction="col"
      onClick={() => {
        navigate(`/boards/${item.id}/${item.name.replaceAll('/* ', '_')}`);
      }}
    >
      <div className="w-full rounded-t-lg overflow-hidden">
        <p
          className={classNames(
            defaultTextStyle,
            'bg-gray-50 border-b py-2 px-1 text-lg',
          )}
        >
          {item.name}
        </p>
      </div>
      <AccessTypeBadge tp={item.type} className="absolute right-1 -top-4" />
    </Stack>
  );
};

const BoardListItemMobile = ({ item }: { item: boardType }) => {
  const navigate = useNavigate();

  return (
    <Stack
      className="w-full bg-gray-50 border px-2 rounded-lg"
      direction="row"
      onClick={() => {
        navigate(`/boards/${item.id}/${item.name.replaceAll('/* ', '_')}`);
      }}
    >
      <AccessTypeBadge tp={item.type} />
      <div className="w-full overflow-hidden">
        <p className={classNames(defaultTextStyle, ' py-2 px-1 text-lg')}>
          {item.name}
        </p>
      </div>
      <Icon size="md">
        <ArrowRightIcon color="gray" />
      </Icon>
    </Stack>
  );
};
