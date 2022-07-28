import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "62d5437ac57b1b3ba153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },
    {
      _id: "62d5437ac57b1b3ba153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },
    {
      _id: "62d5437ac57b1b3ba153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },
    {
      _id: "62d5437ac57b1b3ba153db32",
      user: "62d37268d3104aacef1c99ea",
      title: "test updated again",
      description: "Is the code working?- check update",
      tag: "testing",
      date: "2022-07-18T11:26:50.617Z",
      __v: 0,
    },

    {
      _id: "62e282ed1811b8590aac40ec",
      user: "62d37268d3104aacef1c99ea",
      title: "kholi",
      description: "ye kya horha",
      tag: "twitter",
      date: "2022-07-28T12:37:01.398Z",
      __v: 0,
    },
    {
      _id: "62e282ed1811b8590aac40ec",
      user: "62d37268d3104aacef1c99ea",
      title: "kholi",
      description: "ye kya horha",
      tag: "twitter",
      date: "2022-07-28T12:37:01.398Z",
      __v: 0,
    },
    {
      _id: "62e282ed1811b8590aac40ec",
      user: "62d37268d3104aacef1c99ea",
      title: "kholi",
      description: "ye kya horha",
      tag: "twitter",
      date: "2022-07-28T12:37:01.398Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    // <noteContext.Provider value={{ state: "state", update: "update" }}>
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
