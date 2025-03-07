import { format } from 'date-fns';
import { dateType } from '../common/typing';

export const formatDate = (date?: dateType) => {
  if (!date) {
    return '-';
  }
  return format(new Date(date), 'dd/MM/yyyy');
};
