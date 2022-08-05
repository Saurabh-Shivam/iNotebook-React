import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  // Here using destructuring we are taking out showAlert from props
  const { showAlert } = props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
