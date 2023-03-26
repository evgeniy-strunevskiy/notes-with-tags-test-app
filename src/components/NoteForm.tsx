import React, { FC, useState } from "react";
import { useAddNoteMutation } from "../api/notesApi";
import  classnames  from 'classnames';
import styles from './NoteForm.module.scss'

interface INoteFormProps {}

export const NoteForm: FC<INoteFormProps> = () => {

  const [addNote] = useAddNoteMutation()

  const [note, setNote] = useState<{ title: string; text: string }>({
    title: "",
    text: "",
  });

  const addNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = note.text.replace(/[^a-zа-яё0-9\s]/gi, " ")
    
    const newNote = {
      title: note.title,
      text,
      id: Date.now(),
    };
    addNote(newNote);
    setNote({ title: "", text: "" });
  };

  return (
    <form onSubmit={addNewNote} className={classnames(styles.form)}>
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        placeholder="Название заметки"
      />
      <input
        type="text"
        value={note.text}
        onChange={(e) => setNote({ ...note, text: e.target.value })}
        placeholder="Описание поста"
      />
      <button type="submit">Создать пост</button>
    </form>
  );
};
