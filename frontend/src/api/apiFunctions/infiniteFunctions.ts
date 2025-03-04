import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';
import { chatMessageType } from '../../common/typing';

export type infiniteDataType<itemType> = {
  data: itemType[];
  meta?: {
    pageSize: number;
    currentPage: number;
    remainingItems: number;
    totalNumber: number;
    totalPages: number;
  };
};

export const infiniteFunctions = {
  getChatData: ({
    ticketId,
    boardId,
    page = 0,
  }: {
    ticketId: string;
    boardId: string;
    page?: number;
  }) =>
    axios.post<chatMessageType>(BACKEND_URL + `/chat/${page}`, {
      ticketId,
      boardId,
    }),
};
