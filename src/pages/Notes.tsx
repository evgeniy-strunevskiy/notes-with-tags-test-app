import React, { FC, useEffect, useState } from "react";
import { useGetNotesQuery } from "../api/notesApi";
import { useDeleteTagsMutation, useGetTagsQuery } from "../api/tagsApi";
import { INote } from "./../types/noteTypes";
import { Tags } from "../components/Tags";
import classNames from "classnames";
import styles from './Notes.module.scss'
import { NotesList } from "../components/NotesList";

interface INotesProps {
  getEditableNote: (note: INote) => void;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Notes: FC<INotesProps> = ({ getEditableNote, setEditModal }) => {
  const [removeTagFromTagList] = useDeleteTagsMutation();
  const { data: tagsList, isLoading: isTagsLoading, isError: isTagError } = useGetTagsQuery();
  const { data: notesList, isLoading , isError} = useGetNotesQuery();
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [processedNotes, setProcessedNotes] = useState<INote[]>()

  async function removeTagsOfRemovedNote(removedNote: INote) {
    const notesWithoutRemovedNote = notesList?.filter(
      (note) => note.id !== removedNote.id
    );

    const namesOfUniqueTagsToBeRemove = removedNote.tags?.filter(
      (nameOfTagOfRemovedNote) =>
        notesWithoutRemovedNote?.every((note) =>
          note.tags?.every((tag) => tag !== nameOfTagOfRemovedNote)
        )
    );

    const listTagsToBeRemove = tagsList?.filter((tag) =>
      namesOfUniqueTagsToBeRemove?.includes(tag.text)
    );

    if (listTagsToBeRemove) {
      await Promise.all(
        listTagsToBeRemove?.map(async (TagToBeRemove) => {
          await removeTagFromTagList(TagToBeRemove.id);
        })
      );
    }
  }

  function getTagForFilter(tag: string) {
    setFilterTag(tag);
  }

  
  useEffect(() => {
    const getProcessedNotes = (filterTag: string | null) => {
      if(filterTag) {
        const filteredNotes = notesList?.filter(note => note.tags?.includes(filterTag))
        console.log(filteredNotes)
        setProcessedNotes(filteredNotes)
      } else {
        setProcessedNotes(notesList)
      }
    } 
    getProcessedNotes(filterTag)
    
  },[filterTag, notesList])

  return (
    <>
      {isTagsLoading ? (
        <h1>Идет загрузка...</h1>
      ) : (
        <Tags getTagForFilter={getTagForFilter} />
      )}
      {isTagError && <h1>Ошибка загрузки тегов...</h1>}
      <button className={classNames(styles.notes__btn)} onClick={() => setProcessedNotes(notesList)}>Сбросить фильтр</button>
      {isLoading ? (
        <h1>Идет загрузка...</h1>
        ) : (
          <NotesList
          notesList={processedNotes}
          removeTagsOfRemovedNote={removeTagsOfRemovedNote}
          setEditModal={setEditModal}
          getEditableNote={getEditableNote}
          />
          )}
      {isError && <h1>Ошибка загрузки заметок...</h1>}
    </>
  );
};
