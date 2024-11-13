import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiFunctions } from './apiFunctions/apiFunctions';
import { useNotification } from '../stateProvider/notification/useNotification';
import { t } from 'i18next';

type ExtractDataType<T> = T extends Promise<infer R> ? R : never;
type ExtractVariablesType<T> = T extends (...args: infer A) => any ? A : never;

export function useApiQuery<K extends keyof typeof apiFunctions>(
  key: K,
  variables: ExtractVariablesType<(typeof apiFunctions)[K]>,
  options?: UseQueryOptions<
    ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>['data'], // Only the 'data' part
    AxiosError
  > & { onError?: (error: any) => void },
) {
  const { addNotification } = useNotification();

  const queryFn = async (vars: any) => {
    // Extract 'data' field from the API function response
    const response = await apiFunctions[key](vars.queryKey[1][0]);
    return response.data; // Return only the 'data' field
  };

  return useQuery<
    ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>['data'], // Update to return only the data
    AxiosError
  >({
    queryKey: [key, variables],
    queryFn,
    onError: (error: any) => {
      console.log(error);

      if (options?.onError) {
        options.onError(error);
      } else {
        addNotification({ title: t('Errors.default'), tp: 'alert' });
      }
    },
    retry: 2,
    staleTime: 1000 * 10,
    ...options,
  });
}
