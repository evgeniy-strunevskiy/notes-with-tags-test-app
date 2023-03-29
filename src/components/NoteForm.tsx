import React, { FC, useState } from "react";
import { useAddNoteMutation } from "../api/notesApi";
import classnames from "classnames";
import styles from "./NoteForm.module.scss";
import { useAddTagsMutation, useGetTagsQuery } from "../api/tagsApi";

// const text = note.text.replace(/[^a-zа-яё0-9\s]/gi, " ");
interface INoteFormProps {
  setVisible(modal: boolean): void;
}

export const NoteForm: FC<INoteFormProps> = ({ setVisible }) => {
  const [addNote] = useAddNoteMutation();
  const [addTags] = useAddTagsMutation();
  const { data: oldTags } = useGetTagsQuery();

  const [note, setNote] = useState<{ title: string; text: string; }>({
    title: "",
    text: "",
  });

  const addNewNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (note.text.length > 0 && note.title.length > 0) {
      const tags = note.text.match(/#\S*/gi);
      if (tags) {
        const tagsArray = tags?.map((tag) => ({
          id: Math.random(),
          text: tag,
        }));

        const newTags = oldTags
          ? tagsArray.filter((tag) =>
              oldTags.every((oldTag) => oldTag.text !== tag.text)
            )
          : tagsArray;
        if (newTags) {
          await Promise.all(
            newTags!.map(async (value) => {
              await addTags(value);
            })
          );
        }
      }

      const newNote = {
        id: Math.random(),
        title: note.title,
        text: note.text,
        tags: tags || undefined
      };
      await addNote(newNote);
      setNote({ title: "", text: "" });
      setVisible(false);
    }
  };

  return (
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
        Создать пост
      </button>
    </form>
  );
};
