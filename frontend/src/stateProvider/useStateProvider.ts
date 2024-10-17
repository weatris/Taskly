import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { ConfigSlice } from './config';
import { bindActionCreators } from '@reduxjs/toolkit';
import { AuthSlice } from './auth/auth';
import { NotificationSlice } from './notification/notification';
import { BoardSlice } from './board';

export const useStateProvider = () => {
  const dispatch = useDispatch();
  return {
    state: {
      config: useSelector((state: RootState) => state.config),
      auth: useSelector((state: RootState) => state.auth),
      notification: useSelector((state: RootState) => state.notification),
      board: useSelector((state: RootState) => state.board),
    },
    actions: bindActionCreators(
      {
        ...ConfigSlice.actions,
        ...AuthSlice.actions,
        ...NotificationSlice.actions,
        ...BoardSlice.actions,
      },
      dispatch,
    ),
  };
};
