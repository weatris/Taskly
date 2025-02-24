import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';

export const groupFunctions = {
  createGroup: ({ id, name }: { id: string; name: string }) =>
    axios.post<void>(BACKEND_URL + `/groups/${id}`, { name }),

  deleteGroup: ({ id }: { id: string }) =>
    axios.delete<void>(BACKEND_URL + `/groups/${id}`),

  updateGroup: ({ id, newValue }: { id: string; newValue: string }) =>
    axios.put<void>(BACKEND_URL + `/common/${id}`, {
      newValue,
      itemType: 'group',
      param: 'name',
    }),
};
