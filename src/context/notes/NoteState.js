// import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  //   const s1 = {
  //     name: "Saurabh",
  //     class: "12",
  //   };
  //   const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({ name: "Shivam", class: "10" });
  //     }, 1000);
  //   };
  return (
    // <noteContext.Provider value={{ state: "state", update: "update" }}>
    <noteContext.Provider value={[]}>{props.children}</noteContext.Provider>
  );
};

export default NoteState;
