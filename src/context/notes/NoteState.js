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

    const json = response.json(); //response.json will parse the data
    console.log(json);

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
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMzcyNjhkMzEwNGFhY2VmMWM5OWVhIn0sImlhdCI6MTY1ODEzODY4Nn0.QFgCdUz3-M4bUSjZvmYE379BA2x05QWjoQRxd5KZkKA",
      },
    });
    const json = response.json(); //response.json will parse the data
    console.log(json);

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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMzcyNjhkMzEwNGFhY2VmMWM5OWVhIn0sImlhdCI6MTY1ODEzODY4Nn0.QFgCdUz3-M4bUSjZvmYE379BA2x05QWjoQRxd5KZkKA",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json(); //response.json will parse the data
    console.log(json);

    // Bcz in react we cannot directly change the state so here we have create a newNotes variable
    let newNotes = JSON.parse(JSON.stringify(notes)); // doing JSON.parse will create a deep copy of newNotes
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    // console.log(newNotes);
    setNotes(newNotes);
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
