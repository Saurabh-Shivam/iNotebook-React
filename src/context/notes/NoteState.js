import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "62d5437ac57b1b3bayy153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },
    {
      _id: "62d5437ac57b1b3ffba153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },
    {
      _id: "62d5437ac57b1b3bac153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },
    {
      _id: "62d5437ac5n7b1b3ba153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },

    {
      _id: "62e282edb1811b8590aac40ec",
      user: "62d37268d3104aacef1c99ea",
      title: "kholi",
      description: "ye kya horha",
      tag: "twitter",
      date: "2022-07-28T12:37:01.398Z",
      __v: 0,
    },
    {
      _id: "62e282ed1hhd811b8590aac40ec",
      user: "62d37268d3104aacef1c99ea",
      title: "kholi",
      description: "ye kya horha",
      tag: "twitter",
      date: "2022-07-28T12:37:01.398Z",
      __v: 0,
    },
    {
      _id: "62e282ed18t11b859g0aac40ec",
      user: "62d37268d3104aacef1c99ea",
      title: "kholi",
      description: "ye kya horha",
      tag: "twitter",
      date: "2022-07-28T12:37:01.398Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  // Add a Note

  const addNote = (title, description, tag) => {
    console.log("Adding a new note");
    // TODO: API Call
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

  const editNote = (id, title, description, tag) => {
    // API Call

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
      value={{ notes, setNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
