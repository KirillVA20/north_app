import { z } from 'zod';
import { apiSlice } from '@app/shared/api/apiSlice';
import {
  Organization,
  OrganizationSchema,
} from '../model/schema/organizations.schema';

const organizationsApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Organization'],
  endpoints: {
    getOrganizations: {
      providesTags: ['Organization'],
    },
    getOrganizationById: {
      providesTags: ['Organization'],
    },
    addOrganization: {
      invalidatesTags: ['Organization'],
    },
    updateOrganization: {
      invalidatesTags: ['Organization'],
    },
    deleteOrganization: {
      invalidatesTags: ['Organization'],
    },
  },
});

const GetOrganizationsResponseSchema = z.object({
  items: OrganizationSchema.array(),
});

type GetOrganizationsResponse = z.infer<typeof GetOrganizationsResponseSchema>;

export const OrganizationsApi = organizationsApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<Organization[], void>({
      query: () => 'organizations/',
      transformResponse: (res: GetOrganizationsResponse) => {
        const result = GetOrganizationsResponseSchema.safeParse(res);
        if (result.success) {
          return result.data.items;
        } else {
          return [];
        }
      },
    }),
    getOrganizationById: builder.query<Organization | null, number>({
      query: (id) => `organizations/${id}`,
      transformResponse: (res: Organization) => {
        const result = OrganizationSchema.safeParse(res);
        if (result.success) {
          return result.data;
        } else {
          return null;
        }
      },
    }),
    addOrganization: builder.mutation<Organization, Organization>({
      query: (newOrganization) => ({
        url: `organizations/${newOrganization.id}`,
        method: 'POST',
        body: newOrganization,
      }),
    }),
    updateOrganization: builder.mutation<Organization, Organization>({
      query: (organization) => ({
        url: `organizations/${organization.id}`,
        method: 'PUT',
        body: organization,
      }),
    }),
    deleteOrganization: builder.mutation<void, number>({
      query: (id) => ({
        url: `organizations/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useAddOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = OrganizationsApi;
