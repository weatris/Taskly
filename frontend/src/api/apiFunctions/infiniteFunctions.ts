import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';

export type infiniteDataType<itemType> = {
  data: itemType[];
  meta?: {
    currentPage: number;
    remainingItems: number;
    totalNumber: number;
    totalPages: number;
  };
};

export const infiniteFunctions = {
  getTicketChatDataById: ({ id, page = 0 }: { id: string; page?: number }) =>
    axios.get<chatMessageType>(
      BACKEND_URL + `/ticket/${id}/chat/${page}`,
    ),
};
