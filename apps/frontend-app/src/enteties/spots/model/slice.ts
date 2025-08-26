import { createSlice } from '@reduxjs/toolkit';

interface SpotState {
  selectedSpotId: string | null;
}

const initialState: SpotState = {
  selectedSpotId: null,
};

export const spotSlice = createSlice({
  name: 'spot',
  initialState,
  reducers: {
    setSelectedSpot: (state, action) => {
      state.selectedSpotId = action.payload;
    },
  },
});

export const { setSelectedSpot } = spotSlice.actions;
export default spotSlice.reducer;
