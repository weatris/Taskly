import { markerType } from '../../common/typing';

export const MarkerBadge = ({
  item,
  displayType = 'default',
}: {
  item: markerType;
  displayType?: 'default' | 'small';
}) => {
  if (displayType == 'small')
    return (
      <div
        className="min-w-[30px] h-[8px] rounded-lg"
        style={{
          backgroundColor: item.color,
        }}
      />
    );
  return (
    <div
      className="min-w-[30px] p-1 font-bold text-white text-nowrap rounded-lg cursor-default"
      style={{
        backgroundColor: item.color,
      }}
    >
      {item.name}
    </div>
  );
};
