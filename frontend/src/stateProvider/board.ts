import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardType, markerType, ticketType } from '../common/typing';

interface BoardState {
  boardData?: boardType;
  showCreateBoardModal: boolean;
  markers: markerType[];
  openTicketData?: ticketType;
  shareBoardId: string;
  userToExclude?: number;
  userToInfo?: number;
}

const initialState: BoardState = {
  showCreateBoardModal: false,
  markers: [],
  shareBoardId: '',
};

export const BoardSlice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    setBoardData: (state, action: PayloadAction<boardType>) => {
      state.boardData = action.payload;
    },
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
    setShareBoardId: (state, action: PayloadAction<string>) => {
      state.shareBoardId = action.payload;
    },
    setUserToExclude: (state, action: PayloadAction<number | undefined>) => {
      state.userToExclude = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<number | undefined>) => {
      state.userToInfo = action.payload;
    },
  },
});

export default BoardSlice.reducer;
