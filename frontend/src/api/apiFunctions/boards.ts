import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';

export const boardFunctions = {
  createBoard: ({
    params,
  }: {
    params: { name: string; type: boardAccessType; config: any };
  }) => axios.post<{ id: string }>(BACKEND_URL + '/boards', params),

  searchBoards: ({
    params,
  }: {
    params: { name: string; type: boardAccessType | 'all' };
  }) => axios.post<boardType[]>(BACKEND_URL + '/boards/search', params),

  getBoardById: ({ id }: { id: string }) =>
    axios.get<boardType>(BACKEND_URL + `/boards/${id}`),

  updateConfig: ({ id, config }: { id: string; config: any }) =>
    axios.put<{ id: string }>(BACKEND_URL + `/boards/${id}`, { config }),

  createTicket: ({
    id,
    groupId,
    name,
  }: {
    id: string;
    groupId: string;
    name: string;
  }) =>
    axios.post<void>(BACKEND_URL + `/boards/${id}/tickets`, { name, groupId }),
};
