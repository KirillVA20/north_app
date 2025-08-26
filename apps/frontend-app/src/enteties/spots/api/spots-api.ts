import { apiSlice } from '@app/shared/api/apiSlice';
import { CreateSpotDto, Spot, SpotSchema } from '../model/schema';

const spotApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Spot'],
});

export const spotApi = spotApiWithTag.injectEndpoints({
  endpoints: (build) => ({
    // Получить все точки
    getSpots: build.query<Spot[], { limit?: number; offset?: number }>({
      query: ({ limit = 10, offset = 0 }) => ({
        url: 'spots',
        params: { limit, offset },
      }),
      providesTags: ['Spot'],
      transformResponse: (response: Spot[]) => {
        const result = SpotSchema.array().safeParse(response);
        if (!result.success) {
          throw new Error('Invalid spots data');
        }
        return result.data;
      },
    }),

    // Поиск по названию
    searchSpots: build.query<Spot[], string>({
      query: (query) => ({ url: 'spots/search', params: { query } }),
    }),

    // Точки в радиусе
    getNearbySpots: build.query<
      Spot[],
      { lng: number; lat: number; radius: number }
    >({
      query: ({ lng, lat, radius }) => ({
        url: 'spots/nearby',
        params: { lng, lat, radius },
      }),
      transformResponse: (response: Spot[]) => {
        const result = SpotSchema.array().safeParse(response);
        if (!result.success) {
          throw new Error('Invalid spots data');
        }
        return result.data;
      },
    }),

    // Создать точку (с файлами)
    createSpot: build.mutation<Spot, CreateSpotDto>({
      query: (body) => ({
        url: 'spots/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Spot'],
    }),

    // Удалить точку
    deleteSpot: build.mutation<void, string>({
      query: (id) => ({
        url: `spots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Spot'],
    }),
  }),
});

export const {
  useGetSpotsQuery,
  useSearchSpotsQuery,
  useGetNearbySpotsQuery,
  useCreateSpotMutation,
  useDeleteSpotMutation,
} = spotApi;
