import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardType, markerType, userAccessType } from '../common/typing';

interface BoardState {
  boardData?: boardType;
  showCreateBoardModal: boolean;
  markers: markerType[];
  shareBoardId: string;
  userToExclude?: string;
  openMemberInfo?: string;
  userAccess: userAccessType;
  updateGroupId?: string;
  deleteGroupId?: string;
  showGroupChat?: boolean;
  showTicketFilters?: boolean;
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
    setUpdateGroupId: (state, action: PayloadAction<string | undefined>) => {
      state.updateGroupId = action.payload;
    },
    setDeleteGroupId: (state, action: PayloadAction<string | undefined>) => {
      state.deleteGroupId = action.payload;
    },
    setShowGroupChat: (state, action: PayloadAction<boolean>) => {
      state.showGroupChat = action.payload;
    },
    setShowTicketFilters: (state, action: PayloadAction<boolean>) => {
      state.showTicketFilters = action.payload;
    },
  },
});

export default BoardSlice.reducer;
