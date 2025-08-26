import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

type CommonState = {
  mode: 'events' | 'guide';
  actionMode: 'edit' | 'show';
  guideMode: 'point' | 'route';
};

const initialState: CommonState = {
  mode: 'events',
  actionMode: 'show',
  guideMode: 'point',
};

const commonSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<CommonState['mode']>) {
      state.mode = action.payload;
    },
    setActionMode(state, action: PayloadAction<CommonState['actionMode']>) {
      state.actionMode = action.payload;
    },
    setGuideMode(state, action: PayloadAction<CommonState['guideMode']>) {
      state.guideMode = action.payload;
    },
  },
});

export const { setMode, setActionMode, setGuideMode } = commonSlice.actions;
export default commonSlice.reducer;

export const selectMode = (state: RootState) => state.app.mode;
export const selectActionMode = (state: RootState) => state.app.actionMode;
export const selectGuideMode = (state: RootState) => state.app.guideMode;
