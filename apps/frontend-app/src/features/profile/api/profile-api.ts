import { UserSchema } from '@app/enteties/users/model/schema/users.schema';
import { apiSlice } from '@app/shared/api/apiSlice';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, null>({
      query: () => ({
        url: 'auth/profile',
        method: 'GET',
      }),
      transformResponse: (response) => {
        const result = UserSchema.safeParse(response);
        if (!result.success) {
          throw new Error('Invalid user data');
        }
        console.log('🚀 ~ result:', result);

        return result.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetProfileQuery } = profileApi;
