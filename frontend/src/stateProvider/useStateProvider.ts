import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { ConfigSlice } from './config';
import { bindActionCreators } from '@reduxjs/toolkit';
import { AuthSlice } from './auth/auth';
import { NotificationSlice } from './notification/notification';
import { BoardSlice } from './board';
import { TicketSlice } from './ticket';
import { BoardsSlice } from './boards';

export const useStateProvider = () => {
  const dispatch = useDispatch();
  return {
    state: {
      config: useSelector((state: RootState) => state.config),
      auth: useSelector((state: RootState) => state.auth),
      notification: useSelector((state: RootState) => state.notification),
      board: useSelector((state: RootState) => state.board),
      ticket: useSelector((state: RootState) => state.ticket),
      boards: useSelector((state: RootState) => state.boards),
    },
    actions: bindActionCreators(
      {
        ...ConfigSlice.actions,
        ...AuthSlice.actions,
        ...NotificationSlice.actions,
        ...BoardSlice.actions,
        ...TicketSlice.actions,
        ...BoardsSlice.actions,
      },
      dispatch,
    ),
  };
};
