import React, { FC } from "react";
import styles from "./NotesList.module.scss";
import classNames from "classnames";
import { INote } from "../types/noteTypes";
import { Note } from "./Note";

interface INotesListProps {
  notesList: INote[] | undefined;
  removeTagsOfRemovedNote: (note: INote) => void;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  getEditableNote: (note: INote) => void;
}

export const NotesList: FC<INotesListProps> = ({
  notesList,
  setEditModal,
  removeTagsOfRemovedNote,
  getEditableNote,
}) => {
  return (
    <ul className={classNames(styles.notes)}>
      {notesList?.map((note) => (
        <li key={note.id}>
          <Note
            removeTagsOfRemovedNote={removeTagsOfRemovedNote}
            setEditModal={setEditModal}
            getEditableNote={getEditableNote}
            note={note}
          />
        </li>
      ))}
    </ul>
  );
};
