import React, { FC } from "react";
import { useGetNotesQuery } from "../api/notesApi";
import styles from "./Notes.module.scss";
import classNames from "classnames";
import { Note } from "../components/Note";
import { useDeleteTagsMutation, useGetTagsQuery } from "../api/tagsApi";
import { INote } from "./../types/noteTypes";

interface INotesProps {
  getIdEditableNote: (id: number) => void;
  setEditModal: (modal: boolean) => void;
}

export const Notes: FC<INotesProps> = ({ getIdEditableNote, setEditModal }) => {
  const [removeTags] = useDeleteTagsMutation();
  const { data: notes, isLoading} = useGetNotesQuery();
  const {data: oldTags} = useGetTagsQuery()

  const updateTags = async (wasteTags: string[], note: INote) => {
    const getUpdateNotes = notes?.filter(element => element.id !== note.id);
    
    const deleteTags = wasteTags?.filter((removeTag) =>
    getUpdateNotes?.every((note) => note.tags?.every((tag) => tag !== removeTag))
    );
    const stayingTags = oldTags?.filter((tag) =>
      deleteTags.every((remove) => remove === tag.text)
    );

    if (stayingTags) {
      await Promise.all(
        stayingTags?.map(async (value) => {
          await removeTags(value.id);
        })  
      );
    }
  };

  const removeTagsNote = (tags: string[], note: INote) => {
    updateTags(tags, note)
  };

  return (
    <>
      {isLoading ? (
        <h1>Идет загрузка...</h1>
      ) : (
        <ul className={classNames(styles.notes)}>
          {notes?.map((note) => (
            <li className={classNames(styles.notes__item)} key={note.id}>
              <Note
                removeTagsNote={removeTagsNote}
                setEditModal={setEditModal}
                getIdEditableNote={getIdEditableNote}
                note={note}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
