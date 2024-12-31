import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';

export const infiniteFunctions = {
  getTicketChat: ({ id, pageParam = 0 }: { id: string; pageParam: number }) =>
    axios.get<any>(BACKEND_URL + `/tickets/${id}/${pageParam}`),
};
