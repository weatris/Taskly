import { useQueryClient } from '@tanstack/react-query';
import { apiFunctions } from './apiFunctions/apiFunctions';

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  return (key: keyof typeof apiFunctions) =>
    queryClient.invalidateQueries({ queryKey: [key] });
};
