import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationType } from './typing';

export interface NotificationState {
  notifications: notificationType[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<notificationType>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export default NotificationSlice.reducer;
