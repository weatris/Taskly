import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { ConfigSlice } from './config';
import { bindActionCreators } from '@reduxjs/toolkit';
import { AuthSlice } from './auth/auth';
import { NotificationSlice } from './notification/notification';

export const useStateProvider = () => {
  const dispatch = useDispatch();
  return {
    state: {
      config: useSelector((state: RootState) => state.config),
      auth: useSelector((state: RootState) => state.auth),
      notification: useSelector((state: RootState) => state.notification),
    },
    actions: bindActionCreators(
      {
        ...ConfigSlice.actions,
        ...AuthSlice.actions,
        ...NotificationSlice.actions,
      },
      dispatch,
    ),
  };
};
