import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app-slice';
import { authApi } from '@app/features/auth/api/auth-api';
import { apiSlice } from '../api/apiSlice';
import { sessionReducer } from '@app/enteties/session';
import { spotSlice } from '@app/enteties/spots/model/slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    api: apiSlice.reducer,
    session: sessionReducer,
    spots: spotSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
