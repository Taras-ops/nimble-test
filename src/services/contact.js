import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD
      ? 'https://live.devnimble.com/api/v1/'
      : '/api/v1/',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set(
        'Access-Control-Allow-Methods',
        'GET,OPTIONS,PATCH,DELETE,POST,PUT'
      );
      headers.set('Content-Type', 'application/json');
      headers.set(
        'Authorization',
        'Bearer ' + import.meta.env.VITE_API_AUTH_KEY
      );
      return headers;
    },
  }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => ({ url: 'contacts', sort: 'created:desc' }),
      providesTags: (result) =>
        result?.resources
          ? [
              ...result.resources.map(({ id }) => ({ type: 'Contact', id })),
              'Contact',
            ]
          : ['Contact'],
    }),
    addContact: builder.mutation({
      query: (data) => ({
        url: 'contact',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `contact/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, contactId) => [
        { type: 'Contact', id: contactId },
      ],
    }),
    getContact: builder.query({
      query: (contactId) => `contact/${contactId}`,
      providesTags: (result) => [{ type: 'Contact', id: result?.id }],
    }),
    addContactTag: builder.mutation({
      query: ({ contactId, tags }) => ({
        url: `contacts/${contactId}/tags`,
        method: 'PUT',
        body: { tags },
      }),
      invalidatesTags: (result) => [{ type: 'Contact', id: result.id }],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactQuery,
  useAddContactTagMutation,
  util: { prefetch },
} = contactApi;
