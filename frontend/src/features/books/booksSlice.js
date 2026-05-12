import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books/',
    }),

    getBookById: builder.query({
      query: (id) => `/books/${id}/`,
    }),

    getBookRecommendations: builder.query({
      query: (id) => `/books/${id}/recommend/`,
    }),

    addBook: builder.mutation({
      query: (body) => ({
        url: '/books/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetBookRecommendationsQuery,
  useAddBookMutation,
} = booksApi;
