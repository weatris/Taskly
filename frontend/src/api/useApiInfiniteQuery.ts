import { AxiosError } from 'axios';
import { apiFunctions } from './apiFunctions/apiFunctions';
import { UseQueryOptions } from '@tanstack/react-query';
import { useApiQuery } from './useApiQuery';
import { useState } from 'react';
import { infiniteDataType } from './apiFunctions/infiniteFunctions';

type ExtractDataType<T> = T extends Promise<infer R> ? R : never;
type ExtractVariablesType<T> = T extends (...args: infer A) => any ? A : never;

export function useApiInfiniteQuery<K extends keyof typeof apiFunctions>(
  key: K,
  variables: ExtractVariablesType<(typeof apiFunctions)[K]>,
  options?: UseQueryOptions<
    ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>['data'],
    AxiosError
  > & {
    onError?: (error: any) => void;
    direction?: 'start' | 'end';
    onSuccessCallback?: (
      data: infiniteDataType<
        ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>['data']
      >,
    ) => void;
  },
) {
  type returnTp = ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>['data'];

  const [page, setPage] = useState(0);
  const [data, setData] = useState<infiniteDataType<returnTp>>({ data: [] });
  const direction = options?.direction || 'end';

  const query = useApiQuery(key, [{ ...(variables[0] as any), page }] as any, {
    ...options,
    refetchOnWindowFocus: false,
    onSuccess: (newData: returnTp) => {
      const fullData = {
        data:
          direction === 'start'
            ? [...[...newData.data].reverse(), ...data.data]
            : [...data.data, ...newData.data],
        meta: newData.meta,
      };
      setData(fullData);
      options?.onSuccessCallback?.(fullData);
    },
  });

  return {
    ...query,
    data,
    loadNext: () => {
      const meta = query.data?.meta;

      if (meta?.remainingItems !== 0) {
        setPage((prev) => prev + 1);
      } else {
        console.log('no more items');
      }
    },
    refetch: () => {
      setData({ data: [] });
      setPage(0);
      return query.refetch();
    },
  };
}
