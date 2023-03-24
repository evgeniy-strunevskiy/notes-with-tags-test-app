import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["Notes"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => `notes`,
      providesTags: (result) => ["Notes"],
    }),
    addNote: builder.mutation({
      query: (body) => ({
        url: `notes`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => ["Notes"],
    }),
    updateNote: builder.mutation({
      query: (note) => ({
        url: `notes/${note.id}`,
        method: "PATCH",
        body: note,
      }),
      invalidatesTags: (result) => ["Notes"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
