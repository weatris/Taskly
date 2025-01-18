import Stack from '../../components/Stack/Stack';
import { useState } from 'react';
import { Icon } from '../../images/Icon';
import { ChevronDownIcon, ChevronUpIcon } from '../../images/icons';

export const MarkerListItem = ({
  item,
  children,
}: {
  item: markerType;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Stack className="w-full" direction="col">
      <Stack className="w-full h-[40px] p-2 gap-2 border" direction="row">
        <div
          className="!min-w-[20px] !min-h-[20px] rounded-full"
          style={{
            backgroundColor: item.color,
          }}
        />
        <p className="w-full truncate">{item.name}</p>
        {children}
        {!!item.description && (
          <Icon
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <ChevronUpIcon color="gray" />
            ) : (
              <ChevronDownIcon color="gray" />
            )}
          </Icon>
        )}
      </Stack>
      {isOpen && (
        <div className="w-full h-auto max-h-[160px] overflow-auto text-balance  p-2 border border-t-0">
          <p className="w-full text-sm break-words">{item.description}</p>
        </div>
      )}
    </Stack>
  );
};
