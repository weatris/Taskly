import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardState {
  showCreateBoardModal: boolean;
}

const initialState: BoardState = {
  showCreateBoardModal: false,
};

export const BoardSlice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    toggleCreateBoardModal: (state, action: PayloadAction<boolean>) => {
      state.showCreateBoardModal = action.payload;
    },
  },
});

export default BoardSlice.reducer;
