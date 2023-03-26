import React, { useState } from "react";
import "./App.scss";
import { NoteForm } from "./components/NoteForm";
import { Modal } from "./components/UI/modal/Modal";
import { Notes } from "./pages/Notes";



function App() {
  const [modal, setModal] = useState<boolean>(false);

  function toggleModal(modal: boolean) {
    setModal(modal);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <button className={"wrapper__btn"} onClick={() => toggleModal(true)}>
          Создать заметку
        </button>
        {modal && (
          <Modal visible={modal} setVisible={toggleModal}>
            <NoteForm setVisible={toggleModal} />
          </Modal>
        )}

        <Notes />
      </div>
    </div>
  );
}

export default App;
