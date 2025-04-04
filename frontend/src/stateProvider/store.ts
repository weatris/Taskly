import { configureStore } from '@reduxjs/toolkit';
import configReducer from './config';
import authReducer from './auth/auth';
import notificationReducer from './notification/notification';
import boardReducer from './board';
import boardsReducer from './boards';
import ticketReducer from './ticket';

export const store = configureStore({
  reducer: {
    config: configReducer,
    auth: authReducer,
    notification: notificationReducer,
    board: boardReducer,
    ticket: ticketReducer,
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
