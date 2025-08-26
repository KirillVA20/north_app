import { z } from 'zod';
import { apiSlice } from '@app/shared/api/apiSlice';
import { User, UserSchema } from '../model/schema/users.schema';

const usersApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['User'],
  endpoints: {
    getusers: {
      providesTags: ['User'],
    },
    getuserById: {
      providesTags: ['User'],
    },
    adduser: {
      invalidatesTags: ['User'],
    },
    updateuser: {
      invalidatesTags: ['User'],
    },
    deleteuser: {
      invalidatesTags: ['User'],
    },
  },
});

const GetUsersResponseSchema = z.object({
  items: UserSchema.array(),
});

type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;

export const usersApi = usersApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getusers: builder.query<User[], void>({
      query: () => 'users/',
      transformResponse: (res: GetUsersResponse) => {
        const result = GetUsersResponseSchema.safeParse(res);
        if (result.success) {
          return result.data.items;
        } else {
          return [];
        }
      },
    }),
    getuserById: builder.query<User | null, number>({
      query: (id) => `users/${id}`,
      transformResponse: (res: User) => {
        const result = UserSchema.safeParse(res);
        if (result.success) {
          return result.data;
        } else {
          return null;
        }
      },
    }),
    adduser: builder.mutation<User, User>({
      query: (newUser) => ({
        url: `users/${newUser.id}`,
        method: 'POST',
        body: newUser,
      }),
    }),
    updateuser: builder.mutation<User, User>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteuser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetusersQuery,
  useGetuserByIdQuery,
  useAdduserMutation,
  useUpdateuserMutation,
  useDeleteuserMutation,
} = usersApi;
