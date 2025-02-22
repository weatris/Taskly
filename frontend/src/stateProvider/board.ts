import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  boardType,
  markerType,
  ticketType,
  userAccessType,
} from '../common/typing';

interface BoardState {
  boardData?: boardType;
  showCreateBoardModal: boolean;
  markers: markerType[];
  openTicketData?: ticketType;
  shareBoardId: string;
  userToExclude?: string;
  openMemberInfo?: string;
  userAccess: userAccessType;
}

export const defaultUserPermissions: userAccessType = {
  accessLevel: 'guest',
};

const initialState: BoardState = {
  showCreateBoardModal: false,
  markers: [],
  shareBoardId: '',
  userAccess: defaultUserPermissions,
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
    setUserToExclude: (state, action: PayloadAction<string | undefined>) => {
      state.userToExclude = action.payload;
    },
    setOpenMemberInfo: (state, action: PayloadAction<string | undefined>) => {
      state.openMemberInfo = action.payload;
    },
    setUserAccess: (state, action: PayloadAction<userAccessType>) => {
      state.userAccess = action.payload;
    },
  },
});

export default BoardSlice.reducer;
