import { configureStore } from '@reduxjs/toolkit';
import configReducer from './config';
import authReducer from './auth/auth';
import notificationReducer from './notification/notification';

export const store = configureStore({
  reducer: {
    config: configReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
