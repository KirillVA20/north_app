import { Route, CreateRouteDto, UpdateRouteDto } from '../model/types';
import { apiSlice } from '@app/shared/api/apiSlice';
import { RouteSchema } from '../model/schema';

const spotApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Routes'],
});

export const routeApi = spotApiWithTag.injectEndpoints({
  endpoints: (build) => ({
    createRoute: build.mutation<Route, CreateRouteDto>({
      query: (body) => ({
        url: 'routes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Routes'],
    }),

    getRoutes: build.query<Route[], void>({
      query: () => 'routes',
      providesTags: ['Routes'],
      transformResponse: (response: Route[]) => {
        const result = RouteSchema.array().safeParse(response);
        if (!result.success) {
          return [];
        }
        return result.data;
      },
    }),

    getRouteById: build.query<Route, string>({
      query: (id) => `routes/${id}`,
      transformResponse: (response: Route) => {
        const result = RouteSchema.safeParse(response);
        if (!result.success) {
          throw new Error('Invalid spots data');
        }
        return result.data;
      },
    }),

    deleteRoute: build.mutation<void, string>({
      query: (id) => ({
        url: `routes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Routes'],
    }),
  }),
});

export const {
  useCreateRouteMutation,
  useGetRoutesQuery,
  useGetRouteByIdQuery,
  useDeleteRouteMutation,
} = routeApi;
