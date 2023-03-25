import classnames from "classnames";
import React, { FC } from "react";
import styles from "./Note.module.scss";
import { INote } from "./../types/noteTypes";
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { useDeleteNoteMutation } from "../api/notesApi";

interface NoteTypes {
  note: INote;
}


export const Note: FC<NoteTypes> = ({ note }) => {
  
  const [deleteNote] = useDeleteNoteMutation();
  
  const handleDeleteNote = async (id: number) => {
      await deleteNote(id);
  }
  
  return (
    <div className={classnames(styles.note)}>
      <div className={classnames(styles.note__content)}>
        <h3 className={classnames(styles.note__title)}>{note.title}</h3>
        <p className={classnames(styles.note__text)}>{note.text}</p>
      </div>
      <div className={classnames(styles.note__buttons)}>
      <MdEdit className={classnames(styles.note__edit)} />
      <MdDelete className={classnames(styles.note__delete)} onClick={() => handleDeleteNote(note.id)}/>
      </div>
    </div>
  );
};
