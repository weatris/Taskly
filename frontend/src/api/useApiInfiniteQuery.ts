import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { infiniteFunctions } from './apiFunctions/infiniteFunctions';
import { useNotification } from '../stateProvider/notification/useNotification';
import { t } from 'i18next';

type ExtractDataType<T> = T extends Promise<infer R> ? R : never;
type ExtractVariablesType<T> = T extends (...args: infer A) => any ? A : never;

export function useApiInfiniteQuery<K extends keyof typeof infiniteFunctions>(
  key: K,
  variables: ExtractVariablesType<(typeof infiniteFunctions)[K]>[0],
  options?: UseInfiniteQueryOptions<
    ExtractDataType<ReturnType<(typeof infiniteFunctions)[K]>>['data'],
    AxiosError,
    ExtractDataType<ReturnType<(typeof infiniteFunctions)[K]>>['data'],
    [K, ExtractVariablesType<(typeof infiniteFunctions)[K]>]
  > & { onError?: (error: any) => void },
  getNextPageParam?: (
    lastPage: ExtractDataType<
      ReturnType<(typeof infiniteFunctions)[K]>
    >['data'],
  ) => any,
) {
  const { addNotification } = useNotification();

  const queryFn = async ({ pageParam }: { pageParam: typeof variables }) => {
    const response = await infiniteFunctions[key](pageParam);
    return response.data;
  };

  // return useInfiniteQuery<
  //   ExtractDataType<ReturnType<(typeof infiniteFunctions)[K]>>['data'],
  //   AxiosError
  // >({
  //   queryKey: [key, variables],
  //   queryFn,
  //   getNextPageParam,
  //   onError: (error: any) => {
  //     console.error(error);

  //     if (options?.onError) {
  //       options.onError(error);
  //     } else {
  //       addNotification({ title: t('Errors.default'), tp: 'alert' });
  //     }
  //   },
  //   retry: 2,
  //   staleTime: 1000 * 10,
  //   ...options,
  // });
  return 0;
}
