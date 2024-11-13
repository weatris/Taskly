import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';

export const ticketFunctions = {
  createTicket: ({
    id,
    groupId,
    name,
  }: {
    id: string;
    groupId: string;
    name: string;
  }) => axios.post<void>(BACKEND_URL + `/ticket/${id}`, { name, groupId }),

  getTicketById: ({ id }: { id: string }) =>
    axios.get<ticketType>(BACKEND_URL + `/ticket/${id}`),

  renameTicket: ({ id, newName }: { id: string; newName: string }) =>
    axios.put<void>(BACKEND_URL + `/common/${id}`, {
      newName,
      itemType: 'ticket',
    }),
};
