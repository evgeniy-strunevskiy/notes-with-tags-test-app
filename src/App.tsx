import React from "react";
import "./App.scss";
import { NoteForm } from "./components/NoteForm";
import { Notes } from "./pages/Notes";

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <NoteForm />
        <Notes />
      </div>
    </div>
  );
}

export default App;
