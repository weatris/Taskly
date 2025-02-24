import { Stack } from '../../../components/basic/Stack/Stack';
import { useState } from 'react';
import { Icon } from '../../../images/Icon';
import { ChevronDownIcon, ChevronUpIcon } from '../../../images/icons';
import { markerType } from '../../../common/typing';
import { defaultTextStyle } from '../../../common/styles';

export const MarkerListItem = ({
  item,
  children,
  childrenFirst = false,
}: {
  item?: markerType;
  children?: React.ReactNode;
  childrenFirst?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item) {
    return <></>;
  }

  return (
    <Stack className="w-full" direction="col">
      <Stack className="w-full h-[40px] p-2 gap-2 border" direction="row">
        {childrenFirst && children}
        <div
          className="!min-w-[20px] !min-h-[20px] rounded-full"
          style={{
            backgroundColor: item.color,
          }}
        />
        <p className={defaultTextStyle}>{item.name}</p>
        {!childrenFirst && children}
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
