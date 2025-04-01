import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  isFull: boolean;
  showNavbar: boolean;
}

const initialState: ConfigState = {
  isFull: true,
  showNavbar: true,
};

export const ConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isFull = action.payload;
    },
    toggleNavbar: (state, action: PayloadAction<boolean>) => {
      state.showNavbar = action.payload;
    },
  },
});

export default ConfigSlice.reducer;
