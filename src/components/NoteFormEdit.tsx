import React, { FC, useState } from "react";
import { useGetNotesQuery, useUpdateNoteMutation } from "../api/notesApi";
import classnames from "classnames";
import styles from "./NoteForm.module.scss";
import {
  useAddTagsMutation,
  useDeleteTagsMutation,
  useGetTagsQuery,
} from "../api/tagsApi";
import { INote } from "./../types/noteTypes";
import { ITag } from "./../types/tagTypes";

interface INoteFormEditProps {
  setVisible(modal: boolean): void;
  noteToBeEdited: INote;
}

export const NoteFormEdit: FC<INoteFormEditProps> = ({
  setVisible,
  noteToBeEdited: note,
}) => {
  const { data: notesList } = useGetNotesQuery();
  const [editNote] = useUpdateNoteMutation();
  const [removeTags] = useDeleteTagsMutation();
  const { data: tagsList } = useGetTagsQuery();
  const [addTags] = useAddTagsMutation();
  const [editableNote, setEditableNote] = useState<{
    title: string;
    text: string;
    tags: string[] | undefined;
  }>({ title: note.title, text: note.text, tags: undefined });

  const updateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    //Нужно сравнить старый список тегов и новый:
    //Новые теги добавлены
    //Какие теги удалены
    //Какие теги остались

    //Разные id у тегов

    const namesOfEditedTags = editableNote.text.match(/#\S*/gi);

    let listUniqueTagsRemovedFromNote: ITag[] | undefined = [];
    let listUniqueTagsAddedToNote: ITag[] | undefined = [];

    if (namesOfEditedTags) {
      const notesWithoutEditableNote = notesList?.filter(
        (editedNote) => note!.id !== editedNote.id
      );

      const namesOfTagsRemovedFromNote = note?.tags?.filter(
        (tag) => !namesOfEditedTags.includes(tag)
      );

      const uniqueNamesOfTagsRemovedFromNote =
        namesOfTagsRemovedFromNote?.filter((tagOfRemovedFromNote) =>
          notesWithoutEditableNote?.every((note) =>
            note.tags?.every((tag) => tag !== tagOfRemovedFromNote)));

      listUniqueTagsRemovedFromNote = tagsList?.filter((tag) =>
        uniqueNamesOfTagsRemovedFromNote?.includes(tag.text)
      );

      //------------------------------------

      const namesOfTagsAddedToNote = namesOfEditedTags.filter((tag) =>
      !note?.tags?.includes(tag)
      );

      
      const listTagsAddedToNote = namesOfTagsAddedToNote?.map((tag) => ({
        id: Math.random(),
        text: tag,
      }));
      
      
      listUniqueTagsAddedToNote = listTagsAddedToNote?.filter(
        (tagAddedToNote) =>
        tagsList?.every((tag) => tagAddedToNote.text !== tag.text)
        );
      }
      
    console.log(listUniqueTagsAddedToNote)
      
    if (listUniqueTagsRemovedFromNote) {
      await Promise.all(
        listUniqueTagsRemovedFromNote?.map(async (TagToBeRemove) => {
          await removeTags(TagToBeRemove.id);
        })
      );
    }

    if (listUniqueTagsAddedToNote) {
      await Promise.all(
        listUniqueTagsAddedToNote!.map(async (newUniqueTag) => {
          await addTags(newUniqueTag);
        })
      );
    }

    const editedNote = {
      title: editableNote.title,
      text: editableNote.text,
      id: note!.id,
      tags: namesOfEditedTags || undefined,
    };

    await editNote(editedNote);
    setEditableNote({ title: "", text: "", tags: undefined });
    setVisible(false);
  };

  return (
    <>
      <form onSubmit={updateNote} className={classnames(styles.form)}>
        <input
          required
          className={classnames(styles.form__input)}
          type="text"
          value={editableNote.title}
          onChange={(e) =>
            setEditableNote({ ...editableNote, title: e.target.value })
          }
          placeholder="Название заметки..."
        />
        <textarea
          required
          className={classnames(styles.form__textarea)}
          value={editableNote.text}
          onChange={(e) =>
            setEditableNote({ ...editableNote, text: e.target.value })
          }
          placeholder="Описание заметки..."
        />
        <button className={classnames(styles.form__button)} type="submit">
          Редактировать пост
        </button>
      </form>
    </>
  );
};
