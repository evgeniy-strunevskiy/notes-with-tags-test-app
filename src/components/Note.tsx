import classnames from "classnames";
import React, { FC } from "react";
import styles from "./Note.module.scss";
import { INote } from "./../types/noteTypes";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDeleteNoteMutation } from "../api/notesApi";

interface INoteTypes {
  note: INote;
  setEditModal: (modal: boolean) => void;
  getEditableNote: (note: INote) => void;
  removeTagsOfRemovedNote: (note: INote) => void;
}

export const Note: FC<INoteTypes> = ({
  note,
  setEditModal,
  getEditableNote,
  removeTagsOfRemovedNote,
}) => {
  const [deleteNote] = useDeleteNoteMutation();

  const handleClickButtonDelete = async (id: number) => {
    removeTagsOfRemovedNote(note);
    await deleteNote(id);
  };

  const handleEdit = () => {
    getEditableNote(note);
    setEditModal(true);
  };

  return (
    <div className={classnames(styles.note)}>
      <div className={classnames(styles.note__content)}>
        <h3 className={classnames(styles.note__title)}>{note.title}</h3>
        <p className={classnames(styles.note__text)}>{note.text}</p>
      </div>
      <div className={classnames(styles.note__buttons)}>
        <MdEdit
          className={classnames(styles.note__edit)}
          onClick={() => handleEdit()}
        />
        <MdDelete
          className={classnames(styles.note__delete)}
          onClick={() => handleClickButtonDelete(note.id)}
        />
      </div>
    </div>
  );
};
