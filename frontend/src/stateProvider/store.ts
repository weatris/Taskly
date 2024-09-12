import { configureStore } from '@reduxjs/toolkit';
import configReducer from './config';
import authReducer from './auth/auth';

export const store = configureStore({
  reducer: {
    config: configReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
