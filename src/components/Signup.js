import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // This will prevent the page from beign reloaded

    const { name, email, password } = credentials; // Here we are using destructuring

    // API Call, instead of doing this create a config file and add the urls there and import from the config file or create an environment variable
    // NOTE;-> ALWAYS TRY NOT TO HARDCODE THE URLS LIKE THIS
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("\tAccount Created Successfully", "success");
    } else {
      props.showAlert("\tInvalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {/* NOTE:-> onSubmit method is always added in the form tag not on the button bcz form is submitted not the button  */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onChange}
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            placeholder="Password"
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            placeholder="Password"
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
