import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';
import { dateType, ticketType } from '../../common/typing';

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

  renameTicket: ({ id, newValue }: { id: string; newValue: string }) =>
    axios.put<void>(BACKEND_URL + `/common/${id}`, {
      newValue,
      itemType: 'ticket',
    }),

  setTicketDescription: ({ id, newValue }: { id: string; newValue: string }) =>
    axios.put<void>(BACKEND_URL + `/common/${id}`, {
      newValue,
      itemType: 'ticket',
      param: 'description',
    }),

  changeTicketGroup: ({ id, groupId }: { id: string; groupId: string }) =>
    axios.put<void>(BACKEND_URL + `/ticket/change_group`, {
      id,
      groupId,
    }),

  updateTicket: ({
    id,
    targetId,
    groupId,
  }: {
    id: string;
    targetId: string;
    groupId: string;
  }) =>
    axios.put<void>(BACKEND_URL + `/ticket`, {
      id,
      targetId,
      groupId,
    }),

  changeTicketMarkers: ({ id, newValue }: { id: string; newValue: string[] }) =>
    axios.put<void>(BACKEND_URL + `/common/${id}`, {
      newValue,
      itemType: 'ticket',
      param: 'markers',
    }),

  setDates: ({
    id,
    startDate,
    endDate,
  }: {
    id: string;
    startDate: dateType;
    endDate: dateType;
  }) =>
    axios.put<ticketType>(BACKEND_URL + `/ticket/${id}/dates`, {
      startDate,
      endDate,
    }),

  manageTicketMembers: ({ id, newValue }: { id: string; newValue: string[] }) =>
    axios.put<void>(BACKEND_URL + `/common/${id}`, {
      newValue,
      itemType: 'ticket',
      param: 'assignedTo',
    }),
};
