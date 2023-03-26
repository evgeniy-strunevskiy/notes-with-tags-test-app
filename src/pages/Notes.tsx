import React, { FC } from "react";
import { useGetNotesQuery } from "../api/notesApi";
import styles from "./Notes.module.scss";
import classNames from "classnames";
import { Note } from "../components/Note";

interface INotesProps {
  getIdEditableNote: (id: number) => void;
  setEditModal: (modal: boolean) => void;
}

export const Notes: FC<INotesProps> = ({getIdEditableNote, setEditModal}) => {
  const { data: notes, isLoading } = useGetNotesQuery();

  return (
    <>
      {isLoading ? (
        <h1>Идет загрузка...</h1>
      ) : (
        <ul className={classNames(styles.notes)}>
          {notes?.map((note) => (
            <li className={classNames(styles.notes__item)} key={note.id}>
              <Note setEditModal={setEditModal} getIdEditableNote={getIdEditableNote} note={note} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
