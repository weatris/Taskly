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
  > & { onError?: (error: any) => void; direction?: 'start' | 'end' },
) {
  type returnTp = ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>['data'];

  const [page, setPage] = useState(0);
  const [data, setData] = useState<infiniteDataType<returnTp>>({ data: [] });
  const direction = options?.direction || 'end';

  const query = useApiQuery(key, [{ ...(variables[0] as any), page }] as any, {
    ...options,
    onSuccess: (dt: returnTp) => {
      setData((prev) => {
        return {
          data:
            direction === 'start'
              ? [...[...dt.data].reverse(), ...prev.data]
              : [...prev.data, ...dt.data],
          meta: dt.meta,
        };
      });
      options?.onSuccess?.(dt);
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
