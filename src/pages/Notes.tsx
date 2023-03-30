import React, { FC } from "react";
import { useGetNotesQuery } from "../api/notesApi";
import styles from "./Notes.module.scss";
import classNames from "classnames";
import { Note } from "../components/Note";
import { useDeleteTagsMutation, useGetTagsQuery } from "../api/tagsApi";
import { INote } from "./../types/noteTypes";

interface INotesProps {
  getEditableNote: (note: INote) => void;
  setEditModal: (modal: boolean) => void;
}

export const Notes: FC<INotesProps> = ({ getEditableNote, setEditModal }) => {
  const [removeTagFromTagList] = useDeleteTagsMutation();
  const { data: notesList, isLoading } = useGetNotesQuery();
  const { data: tagsList } = useGetTagsQuery();

  const updateTagsList = async ( removedNote: INote) => {

    //Нужно разобраться как здесь получить уже обновленный список заметок
    const notesWithoutRemovedNote = notesList?.filter((note) => note.id !== removedNote.id);

    const namesOfUniqueTagsToBeRemove = removedNote.tags?.filter((nameOfTagOfRemovedNote) =>
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
  };

  const removeTagsOfRemovedNote = (removedNote: INote) => {
    updateTagsList(removedNote);
  };

  return (
    <>
      {isLoading ? (
        <h1>Идет загрузка...</h1>
      ) : (
        <ul className={classNames(styles.notes)}>
          {notesList?.map((note) => (
            <li className={classNames(styles.notes__item)} key={note.id}>
              <Note
                removeTagsOfRemovedNote={removeTagsOfRemovedNote}
                setEditModal={setEditModal}
                getEditableNote={getEditableNote}
                note={note}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
