import React, { FC, useState } from "react";
import { useAddNoteMutation } from "../api/notesApi";
import classnames from "classnames";
import styles from "./NoteForm.module.scss";
import { useAddTagsMutation, useGetTagsQuery } from "../api/tagsApi";
import { ITag } from "../types/tagTypes";

// const text = note.text.replace(/[^a-zа-яё0-9\s]/gi, " ");
interface INoteFormProps {
  setVisible(modal: boolean): void;
}

export const NoteForm: FC<INoteFormProps> = ({ setVisible }) => {
  const [addNote] = useAddNoteMutation();
  const [addTags] = useAddTagsMutation();
  const { data: tagsList } = useGetTagsQuery();
  const [note, setNote] = useState<{ title: string; text: string }>({
    title: "",
    text: "",
  });

  const handleClickButtonForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const namesOfNewTags = note.text.match(/#\S*/gi);

    let newUniqueTagsList: ITag[] = [];

    if (namesOfNewTags) {
      const newTagsList = namesOfNewTags.map((tag) => ({
        id: Math.random(),
        text: tag,
      }));

      newUniqueTagsList = tagsList
        ? newTagsList.filter((newTag) =>
            tagsList.every((tag) => tag.text !== newTag.text)
          )
        : newTagsList;
    }

    if (newUniqueTagsList) {
      await Promise.all(
        newUniqueTagsList.map(async (newUniqueTag) => {
          await addTags(newUniqueTag);
        })
      );
    }

    const newNote = {
      id: Math.random(),
      title: note.title,
      text: note.text,
      tags: namesOfNewTags || undefined,
    };

    await addNote(newNote);
    setNote({ title: "", text: "" });
    setVisible(false);
  };

  return (
    <form onSubmit={handleClickButtonForm} className={classnames(styles.form)}>
      <input
        required
        className={classnames(styles.form__input)}
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        placeholder="Название заметки..."
      />
      <textarea
        required
        className={classnames(styles.form__textarea)}
        value={note.text}
        onChange={(e) => setNote({ ...note, text: e.target.value })}
        placeholder="Описание заметки..."
      />
      <button
        onSubmit={handleClickButtonForm}
        className={classnames(styles.form__button)}
        type="submit"
      >
        Создать пост
      </button>
    </form>
  );
};
