import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';
import { Button } from './Button';
import { Virtuoso } from 'react-virtuoso';
import { infiniteDataType } from '../../api/apiFunctions/infiniteFunctions';

export type VirtualizedListType<itemType> = {
  queryParams: UseQueryResult<
    infiniteDataType<itemType>,
    AxiosError<unknown, any>
  > & {
    loadNext: () => void;
  };
  direction?: 'down' | 'up';
  renderItem: (item: itemType) => React.ReactNode;
};

export function VirtualizedList<itemType>({
  queryParams,
  direction = 'down',
  renderItem,
}: VirtualizedListType<itemType>) {
  const { data: pages, isFetching, loadNext } = queryParams;

  const data = pages?.data;

  const itemContent = (_: number, item: itemType) => {
    return renderItem(item);
  };

  const endReached = () => {
    if (direction !== 'down') return;
    console.log('endReached');
    !isFetching && loadNext();
  };

  const startReached = () => {
    if (direction !== 'up') return;
    console.log('startReached');
    !isFetching && loadNext();
  };

  return (
    <div className="w-full h-full flex flex-col items-start p-2 gap-2 overflow-auto">
      <Virtuoso
        data={data}
        followOutput={'auto'}
        initialTopMostItemIndex={99999}
        atBottomStateChange={endReached}
        atTopStateChange={startReached}
        itemContent={itemContent}
        style={{
          height: '100%',
          width: '100%',
          flex: '1 1 auto',
          overscrollBehavior: 'contain',
        }}
      />
      <Button {...{ text: 'Load next', onClick: loadNext }} />
    </div>
  );
}
