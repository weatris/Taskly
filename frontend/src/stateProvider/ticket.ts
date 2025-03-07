import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ticketType, userAccessType } from '../common/typing';

interface TicketState {
  openTicketData?: ticketType;
  showTicketFilters?: boolean;
  filterMembers?: string[];
  filterMarkers?: string[];
}

export const defaultUserPermissions: userAccessType = {
  accessLevel: 'guest',
};

const initialState: TicketState = {
  filterMembers: [],
  filterMarkers: [],
};

export const TicketSlice = createSlice({
  name: 'Ticket',
  initialState,
  reducers: {
    setOpenTicketData: (
      state,
      action: PayloadAction<ticketType | undefined>,
    ) => {
      state.openTicketData = action.payload;
    },
    setShowTicketFilters: (state, action: PayloadAction<boolean>) => {
      state.showTicketFilters = action.payload;
    },
    setFilterMembers: (state, action: PayloadAction<string[]>) => {
      state.filterMembers = action.payload;
    },
    setFilterMarkers: (state, action: PayloadAction<string[]>) => {
      state.filterMarkers = action.payload;
    },
  },
});

export default TicketSlice.reducer;
