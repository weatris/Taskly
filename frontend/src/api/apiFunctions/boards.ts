import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';
import {
  boardAccessType,
  boardType,
  chatMessageType,
  markerType,
  memberType,
  permissionLevelType,
} from '../../common/typing';
import { infiniteDataType } from './infiniteFunctions';

export const boardFunctions = {
  createBoard: ({
    params,
  }: {
    params: { name: string; type: boardAccessType; description?: string };
  }) => axios.post<{ id: string }>(BACKEND_URL + '/boards', params),

  searchBoards: ({
    params,
  }: {
    params: { name: string; type: boardAccessType | 'all' };
  }) => axios.post<boardType[]>(BACKEND_URL + '/boards/search', params),

  getBoardById: ({ id }: { id: string }) =>
    axios.get<boardType>(BACKEND_URL + `/boards/${id}`),

  updateBoard: ({
    id,
    name,
    description,
    type,
  }: {
    id: string;
    name: string;
    type: boardAccessType;
    description?: string;
  }) =>
    axios.put<{ id: string }>(BACKEND_URL + `/boards/${id}`, {
      name,
      description,
      type,
    }),

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

  excludeUserFromBoard: ({ id, userId }: { id: string; userId: string }) =>
    axios.post<string>(BACKEND_URL + `/boards/${id}/exclude/${userId}`),

  getBoardMemberData: ({ id, userId }: { id?: string; userId?: string }) =>
    axios.get<memberType>(BACKEND_URL + `/boards/${id}/user/${userId}`),

  updateMemberInfoFromBoard: ({
    id,
    userId,
    description,
    level,
  }: {
    id: string;
    userId: string;
    description: string;
    level: permissionLevelType;
  }) =>
    axios.put<string>(BACKEND_URL + `/boards/${id}/user/${userId}`, {
      description,
      level,
    }),

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

  getTicketChatDataById: ({ id, page = 0 }: { id: string; page?: number }) =>
    axios.get<infiniteDataType<chatMessageType>>(
      BACKEND_URL + `/ticket/${id}/chat/${page}`,
    ),
};
