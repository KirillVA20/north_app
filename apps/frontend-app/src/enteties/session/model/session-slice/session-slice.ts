// @ts-strict-ignore
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { SessionSchema } from '../types/session-schema';

const initialState: SessionSchema = {
  token: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loadSession: (state) => {
      const token = Cookies.get('ACCESS_TOKEN');

      if (token) {
        state.token = token;
      }
    },
    setSessionToken: (state, action: PayloadAction<string>) => {
      const token = action.payload;

      Cookies.set('ACCESS_TOKEN', token);
      state.token = token;
    },
  },
});

export const { loadSession, setSessionToken } = sessionSlice.actions;
export const { reducer: sessionReducer } = sessionSlice;
