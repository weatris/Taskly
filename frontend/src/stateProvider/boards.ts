import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardsState {
  searchValue: string;
  selectedOption: string;
}

const initialState: BoardsState = {
  searchValue: '',
  selectedOption: 'public',
};

export const BoardsSlice = createSlice({
  name: 'Boards',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSelectedOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
  },
});

export default BoardsSlice.reducer;
