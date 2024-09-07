import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  isFull: boolean;
}

const initialState: ConfigState = {
  isFull: true,
};

export const ConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isFull = action.payload;
    },
  },
});

export default ConfigSlice.reducer;
