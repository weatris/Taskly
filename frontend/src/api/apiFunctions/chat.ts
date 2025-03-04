import axios from 'axios';
import { BACKEND_URL } from './apiFunctions';
import { chatMessageType } from '../../common/typing';

export const chatFunctions = {
  createChatMessage: ({
    ticketId,
    message,
    boardId,
    messageId,
  }: {
    ticketId: string;
    message: string;
    boardId: string;
    messageId: string;
  }) =>
    axios.post<{ id: string }>(BACKEND_URL + `/chat`, {
      ticketId,
      message,
      boardId,
      messageId,
    }),

  getChatMessageById: ({ id }: { id: string }) => {
    return axios.get<chatMessageType>(BACKEND_URL + `/chat/${id}`);
  },
};
