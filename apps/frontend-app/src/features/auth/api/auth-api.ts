import { User } from '@app/enteties/users';
import { UserSchema } from '@app/enteties/users/model/schema/users.schema';
import { apiSlice } from '@app/shared/api/apiSlice';

type SignUpUserRequest = {
  username: string;
  email: string;
  password: string;
};

type SignInUserRequest = {
  username: string;
  password: string;
};

type SignInUserResponse = {
  access_token: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, SignUpUserRequest>({
      query: (user) => ({
        url: 'auth/signup',
        method: 'POST',
        body: user,
      }),
      transformResponse: (response) => {
        const result = UserSchema.safeParse(response);
        if (!result.success) {
          throw new Error('Invalid user data');
        }
        return result.data;
      },
    }),
    signIn: builder.mutation<SignInUserResponse, SignInUserRequest>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response) => {
        return response as SignInUserResponse;
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: 'auth/profile',
        method: 'GET',
      }),
      transformResponse: (response) => {
        const result = UserSchema.safeParse(response);
        if (!result.success) {
          throw new Error('Invalid user data');
        }
        return result.data;
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetProfileQuery } =
  authApi;
