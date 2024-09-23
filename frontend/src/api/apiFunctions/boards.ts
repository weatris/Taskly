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
    params: { name: string; type: boardAccessType };
  }) => axios.post<boardType[]>(BACKEND_URL + '/boards/search', params),

  getBoardById: ({ params }: { params: { id: string } }) =>
    axios.get<boardType>(BACKEND_URL + `/boards/${params.id}`),
};
