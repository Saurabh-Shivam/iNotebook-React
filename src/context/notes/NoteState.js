import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    console.log("Adding a new note");

    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMzcyNjhkMzEwNGFhY2VmMWM5OWVhIn0sImlhdCI6MTY1ODEzODY4Nn0.QFgCdUz3-M4bUSjZvmYE379BA2x05QWjoQRxd5KZkKA",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note");

    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMzcyNjhkMzEwNGFhY2VmMWM5OWVhIn0sImlhdCI6MTY1ODEzODY4Nn0.QFgCdUz3-M4bUSjZvmYE379BA2x05QWjoQRxd5KZkKA",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "62e282ed18t11b859g0aac40ecded",
      user: "62d37268d3104aacef1c99ea",
      title: title,
      description: description,
      tag: tag,
      date: "2022-07-28T12:37:01.398Z",
      __v: 0,
    };
    // NOTE:-> concat returns an array whereas push updates an array
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log("Deleteing note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMzcyNjhkMzEwNGFhY2VmMWM5OWVhIn0sImlhdCI6MTY1ODEzODY4Nn0.QFgCdUz3-M4bUSjZvmYE379BA2x05QWjoQRxd5KZkKA",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json(); //response.json will parse the data

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    // <noteContext.Provider value={{ state: "state", update: "update" }}>
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
