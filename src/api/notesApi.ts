import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INote } from "../types/noteTypes";

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["Notes"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getNotes: builder.query<INote[], void>({
      query: () => `notes`,
      providesTags: (result) => ["Notes"],
    }),
    addNote: builder.mutation<INote, INote>({
      query: (body) => ({
        url: `notes`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => ["Notes"],
    }),
    updateNote: builder.mutation<INote, INote>({
      query: (note) => ({
        url: `notes/${note.id}`,
        method: "PATCH",
        body: note,
      }),
      invalidatesTags: (result) => ["Notes"],
    }),
    deleteNote: builder.mutation<INote, number>({
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
