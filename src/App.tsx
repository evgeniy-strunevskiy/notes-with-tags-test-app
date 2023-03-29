import React, { useState } from "react";
import "./App.scss";
import { NoteForm } from "./components/NoteForm";
import { NoteFormEdit } from "./components/NoteFormEdit";
import { Tags } from "./components/Tags";
import { Modal } from "./components/UI/modal/Modal";
import { Notes } from "./pages/Notes";

function App() {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [idEditableNote, setIdEditableNote] = useState<number>();
  const [modal, setModal] = useState<boolean>(false);

  function toggleModal(modal: boolean) {
    setModal(modal);
  }

  function getIdEditableNote(id: number) {
    setIdEditableNote(id);
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
        {idEditableNote && (
          <>
            {editModal && idEditableNote && (
              <Modal visible={editModal} setVisible={setEditModal}>
                <NoteFormEdit
                  idEditableNote={idEditableNote!}
                  setVisible={toggleEditModal}
                />
              </Modal>
            )}
          </>
        )}
        <Notes
          setEditModal={setEditModal}
          getIdEditableNote={getIdEditableNote}
        />
      </div>
    </div>
  );
}

export default App;
