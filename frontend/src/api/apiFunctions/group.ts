import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';

export const groupFunctions = {
  createGroup: ({ id, name }: { id: string; name: string }) =>
    axios.post<void>(BACKEND_URL + `/groups/${id}`, { name }),

  renameGroup: ({ id, newName }: { id: string; newName: string }) =>
    axios.put<void>(BACKEND_URL + `/common/${id}`, { newName, itemType:'group' }),
};
