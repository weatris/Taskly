import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  email: string;
  name: string;
  expirationDate?: string;
  id: string;
}

const initialState: AuthState = {
  token: '',
  email: '',
  name: '',
  id: '',
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState | undefined>) => {
      if (!action.payload) {
        state = initialState;
        return;
      }
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;

      const expirationDate = action.payload.expirationDate;
      if (expirationDate) {
        state.expirationDate = new Date(expirationDate).toISOString();
      }
    },
  },
});

export default AuthSlice.reducer;
