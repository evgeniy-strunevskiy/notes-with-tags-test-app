import React, { FC, useEffect, useState } from "react";
import { useGetNoteQuery, useUpdateNoteMutation } from "../api/notesApi";
import classnames from "classnames";
import styles from "./NoteForm.module.scss";

interface INoteFormEditProps {
  setVisible(modal: boolean): void;
  idEditableNote: number;
}

export const NoteFormEdit: FC<INoteFormEditProps> = ({
  setVisible,
  idEditableNote,
}) => {
  const [editNote] = useUpdateNoteMutation();
  const { data: editableNote } = useGetNoteQuery(idEditableNote);
  const [note, setNote] = useState<{ title: string; text: string, tags: string[] | undefined }>({
    title: "",
    text: "",
    tags: undefined
  });

  const addNewNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (note.text.length > 0 && note.title.length > 0) {
      const text = note.text.replace(/[^a-zа-яё0-9\s]/gi, " ");

      const newNote = {
        title: note.title,
        text,
        id: editableNote!.id,
        tags: editableNote?.tags
      };
      await editNote(newNote);
      setNote({ title: "", text: "", tags: undefined});
      setVisible(false);
    }
  };

  useEffect(() => {
    setNote({
      title: editableNote?.title || "",
      text: editableNote?.text || "",
      tags: editableNote?.tags
    });
  }, [editableNote]);

  return (
    <>
      <form onSubmit={addNewNote} className={classnames(styles.form)}>
        <input
          className={classnames(styles.form__input)}
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="Название заметки..."
        />
        <textarea
          className={classnames(styles.form__textarea)}
          value={note.text}
          onChange={(e) => setNote({ ...note, text: e.target.value })}
          placeholder="Описание заметки..."
        />
        <button className={classnames(styles.form__button)} type="submit">
          Редактировать пост
        </button>
      </form>
    </>
  );
};
