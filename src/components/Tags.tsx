import React from 'react'
import { useGetNoteQuery, useGetNotesQuery } from '../api/notesApi';
import { useGetTagsQuery } from '../api/tagsApi';

export const Tags = () => {
  const { data: tags, isLoading } = useGetTagsQuery();

  return (
    <div className="">
    {isLoading ? (
      <h1>Идет загрузка...</h1>
    ) : (
      tags?.map((tag) => (
        <span
          style={{
            background: "gray",
            padding: 10,
            marginRight: 10,
            borderRadius: 10,
          }}
          key={tag.id}
        >
          {tag.text}
        </span>
      ))
    )}
  </div>
  )
}
