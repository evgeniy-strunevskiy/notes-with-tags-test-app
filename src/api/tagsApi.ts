import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITag } from "../types/tagTypes";
export const tagsApi = createApi({
  reducerPath: "tagsApi",
  tagTypes: ["Tags"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getTags: builder.query<ITag[], void>({
      query: () => `tags`,
      providesTags: (result) => ["Tags"],
    }),
    addTags: builder.mutation<ITag[], ITag>({
      query: (body) => (
        {
        url: `tags`,
        method: "POST",
        body: body
      }
      ),
      invalidatesTags: (result) => ["Tags"],
    }),
    updateTags: builder.mutation<ITag, ITag>({
      query: (tag) => ({
        url: `tags/${tag.id}`,
        method: "PATCH",
        body: tag,
      }),
      invalidatesTags: (result) => ["Tags"],
    }),
    deleteTags: builder.mutation({
      query(id) {
        return {
          url: `tags/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result) => ["Tags"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useAddTagsMutation,
  useUpdateTagsMutation,
  useDeleteTagsMutation,
} = tagsApi;
