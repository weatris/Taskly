import { useQueryClient } from '@tanstack/react-query';
import { apiFunctions } from './apiFunctions/apiFunctions';

export const useRemoveQuery = () => {
  const queryClient = useQueryClient();
  return (key: keyof typeof apiFunctions) =>
    queryClient.removeQueries({ queryKey: [key] });
};
