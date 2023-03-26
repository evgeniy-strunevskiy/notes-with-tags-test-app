import React, { FC, useState } from "react";
import { NoteForm } from "./NoteForm";
import { NoteFormEdit } from "./NoteFormEdit";
import { Modal } from "./UI/modal/Modal";

interface HandleNotesProps {
  toggleEditModal: (modal: boolean) => void;
  setEditModal: (modal: boolean) => void;
  editModal: boolean;
  idEditableNote: number;
  modal: boolean;
  toggleModal: (modal: boolean) => void;
}

export const HandleNotes: FC<HandleNotesProps> = ({
  toggleEditModal,
  editModal,
  setEditModal,
  idEditableNote,
  modal,
  toggleModal,
}) => {
  return (
    <>
      {modal && (
        <Modal visible={modal} setVisible={toggleModal}>
          <NoteForm setVisible={toggleModal} />
        </Modal>
      )}
      {editModal && idEditableNote && (
        <Modal visible={editModal} setVisible={setEditModal}>
          <NoteFormEdit
            idEditableNote={idEditableNote!}
            setVisible={toggleEditModal}
          />
        </Modal>
      )}
    </>
  );
};
