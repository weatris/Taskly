import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardState {
  showCreateBoardModal: boolean;
  markers: markerType[];
  openTicketData?: ticketType;
}

const initialState: BoardState = {
  showCreateBoardModal: false,
  markers: [],
};

export const BoardSlice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    toggleCreateBoardModal: (state, action: PayloadAction<boolean>) => {
      state.showCreateBoardModal = action.payload;
    },
    setMarkers: (state, action: PayloadAction<markerType[]>) => {
      state.markers = action.payload;
    },
    setOpenTicketData: (
      state,
      action: PayloadAction<ticketType | undefined>,
    ) => {
      state.openTicketData = action.payload;
    },
  },
});

export default BoardSlice.reducer;
