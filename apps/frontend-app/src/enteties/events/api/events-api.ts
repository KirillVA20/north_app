import { z } from 'zod';
import { Event, EventSchema } from '../model/schema/events.schema';
import { apiSlice } from '@app/shared/api/apiSlice';

const eventsApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Event'],
  endpoints: {
    getEvents: {
      providesTags: ['Event'],
    },
    getEventById: {
      providesTags: ['Event'],
    },
    addEvent: {
      invalidatesTags: ['Event'],
    },
    updateEvent: {
      invalidatesTags: ['Event'],
    },
    deleteEvent: {
      invalidatesTags: ['Event'],
    },
  },
});

const GetEventsResponseSchema = z.object({
  items: EventSchema.array(),
});

type GetEventsResponse = z.infer<typeof GetEventsResponseSchema>;

export const eventsApi = eventsApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => 'events/',
      transformResponse: (res: GetEventsResponse) => {
        const result = GetEventsResponseSchema.safeParse(res);
        if (result.success) {
          return result.data.items;
        } else {
          return [];
        }
      },
    }),
    getEventById: builder.query<Event | null, number>({
      query: (id) => `events/${id}`,
      transformResponse: (res: Event) => {
        const result = EventSchema.safeParse(res);
        if (result.success) {
          return result.data;
        } else {
          return null;
        }
      },
    }),
    addEvent: builder.mutation<Event, Omit<Event, 'id'>>({
      query: (newEvent) => ({
        url: 'events/',
        method: 'POST',
        body: newEvent,
      }),
    }),
    updateEvent: builder.mutation<Event, Event>({
      query: (updatedEvent) => ({
        url: `events/${updatedEvent.id}`,
        method: 'PUT',
        body: updatedEvent,
      }),
    }),
    deleteEvent: builder.mutation<void, number>({
      query: (id) => ({
        url: `events/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
