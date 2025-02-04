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

  createBoardShareLink: ({ id }: { id: string }) =>
    axios.post<{ id: string }>(BACKEND_URL + `/boards/${id}/share`),

  getBoardShareLink: ({ id }: { id: string }) =>
    axios.get<{ value: string; lifetime: number }>(
      BACKEND_URL + `/boards/${id}/share`,
    ),

  createDeleteShareLink: ({ id }: { id: string }) =>
    axios.delete<void>(BACKEND_URL + `/boards/${id}/share`),

  joinBoardByLink: ({ id, token }: { id: string; token: string }) =>
    axios.post<string>(BACKEND_URL + `/boards/${id}/join/${token}`),

  getMarkers: ({ id }: { id: string }) =>
    axios.get<markerType[]>(BACKEND_URL + `/boards/${id}/markers`),

  createMarker: ({
    id,
    name,
    color,
    description,
  }: {
    id: string;
    name: string;
    color: string;
    description: string;
  }) =>
    axios.post(BACKEND_URL + `/boards/${id}/markers`, {
      name,
      color,
      description,
    }),

  updateMarker: ({
    id,
    name,
    color,
    description,
    selectedMarker,
  }: {
    id: string;
    name: string;
    color: string;
    description: string;
    selectedMarker: string;
  }) =>
    axios.put(BACKEND_URL + `/boards/${id}/markers`, {
      name,
      color,
      description,
      selectedMarker,
    }),

  deleteMarker: ({ boardId, id }: { boardId: string; id: string }) =>
    axios.delete(BACKEND_URL + `/boards/${boardId}/markers/${id}`),
};
