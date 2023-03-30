import React, { useState } from "react";
import "./App.scss";
import { NoteForm } from "./components/NoteForm";
import { NoteFormEdit } from "./components/NoteFormEdit";
import { Tags } from "./components/Tags";
import { Modal } from "./components/UI/modal/Modal";
import { Notes } from "./pages/Notes";
import { INote } from "./types/noteTypes";

function App() {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editableNote, setEditableNote] = useState<INote>();
  const [modal, setModal] = useState<boolean>(false);

  function toggleModal(modal: boolean) {
    setModal(modal);
  }

  function getEditableNote(note: INote) {
    setEditableNote(note);
  }

  function toggleEditModal(modal: boolean) {
    setEditModal(modal);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <button className={"wrapper__btn"} onClick={() => toggleModal(true)}>
          Создать заметку
        </button>
        <Tags />
        {modal && (
          <Modal visible={modal} setVisible={toggleModal}>
            <NoteForm setVisible={toggleModal} />
          </Modal>
        )}
        {editModal && (
          <Modal visible={editModal} setVisible={setEditModal}>
            <NoteFormEdit
              noteToBeEdited={editableNote!}
              setVisible={toggleEditModal}
            />
          </Modal>
        )}
        <Notes
          setEditModal={setEditModal}
          getEditableNote={getEditableNote}
        />
      </div>
    </div>
  );
}

export default App;
