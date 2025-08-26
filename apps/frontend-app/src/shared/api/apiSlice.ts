import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { RootState } from '../store';
const mutex = new Mutex();

type BaseQueryWithReauth = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:3000`,
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const { session } = getState() as RootState;

    if (session.token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }
    headers.set('Accept', 'application/json');

    // Ensure Content-Type is always application/json
    headers.set('Content-Type', 'application/json');

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryWithReauth = async (args, api, extraOptions) => {
  // await mutex.waitForUnlock();
  let response = await baseQuery(args, api, extraOptions);

  // if (!mutex.isLocked()) {
  //   const release = await mutex.acquire();

  //   try {
  //   } catch (error) {
  //   } finally {
  //     release();
  //   }
  // } else {
  //   await mutex.waitForUnlock();
  //   response = await baseQuery(args, api, extraOptions);
  // }

  return response;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  endpoints: () => ({}),
});
