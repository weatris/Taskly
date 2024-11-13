import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiFunctions } from './apiFunctions/apiFunctions';
import { useNotification } from '../stateProvider/notification/useNotification';
import { t } from 'i18next';

type ExtractDataType<T> = T extends Promise<AxiosResponse<infer R>> ? R : never;
type ExtractVariablesType<T> = T extends (args: infer A) => any ? A : never;

export function useApiMutation<K extends keyof typeof apiFunctions>(
  key: K,
  options?: UseMutationOptions<
    ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>,
    AxiosError,
    ExtractVariablesType<(typeof apiFunctions)[K]>
  >,
): UseMutationResult<
  ExtractDataType<ReturnType<(typeof apiFunctions)[K]>>,
  AxiosError,
  ExtractVariablesType<(typeof apiFunctions)[K]>,
  unknown
> {
  const { addNotification } = useNotification();
  const mutationFn = (variables: any) =>
    apiFunctions[key](variables).then((response) => response.data);

  return useMutation<
    any,
    AxiosError,
    ExtractVariablesType<(typeof apiFunctions)[K]>,
    unknown
  >({
    mutationFn,
    ...{
      onError: (error) => {
        console.log(error);
        addNotification({ title: t('Errors.default'), tp: 'alert' });
      },
      retry: 2,
      ...options,
    },
  });
}
