import React from "react";
import { useGetNotesQuery } from "../api/notesApi";
import styles from "./Notes.module.scss";
import classNames from "classnames";
import { Note } from "../components/Note";

export const Notes = () => {
  const { data: notes } = useGetNotesQuery();

  return (
      <ul className={classNames(styles.notes)}>
        {notes?.map((note) => (
          <li className={classNames(styles.notes__item)} key={note.id}>
            <Note note={note} />
          </li>
        ))}
      </ul>
  );
};
