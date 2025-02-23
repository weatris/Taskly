import { markerDisplayLimit } from '../common/constants';
import { markerType } from '../common/typing';
import { Icon } from '../images/Icon';
import { PlusIcon } from '../images/icons';
import { MarkerBadge } from './Markers/MarkerBadge';

export const MarkerDisplay = ({
  ticketMarkers,
  size = 'default',
}: {
  ticketMarkers: markerType[];
  size?: 'small' | 'default';
}) => {
  const markersToDisplay =
    size === 'default'
      ? ticketMarkers
      : ticketMarkers.slice(0, markerDisplayLimit);

  return (
    <>
      {markersToDisplay.map((item) => (
        <MarkerBadge key={item.id} {...{ item, displayType: size }} />
      ))}
      {ticketMarkers.length > markerDisplayLimit && size === 'default' && (
        <Icon size="sm" hoverable={false}>
          <PlusIcon color="gray" />
        </Icon>
      )}
    </>
  );
};
