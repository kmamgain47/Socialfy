import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const userCredentials = form;
    const credentials = JSON.stringify(userCredentials);
    const response = await fetch(
      `https://social-fy.herokuapp.com/checkCredentials/${credentials}`
    );

    setForm({
      email: "",
      password: "",
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const curUser = await response.json();
    if (!curUser) {
      window.alert(
        `Oops! incorrect Credentials. If you dont have an account try Sign Up..`
      );
      return;
    }
    props.setData(curUser);

    console.log("Successfully Logged In");
    navigate("/");
  }

  return (
    <form onSubmit={onSubmit}>
      <button className="btn">
        <i className="fa fa-home"></i> Home
      </button>
      {/*  Email input  */}
      <div className="form-outline mb-4">
        <input
          type="email"
          id="emailInput"
          className="form-control"
          value={form.email}
          onChange={(e) => updateForm({ email: e.target.value })}
        />
        <label className="form-label" htmlFor="emailInput">
          Email Address
        </label>
      </div>

      {/*  Password input  */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="passwordInput"
          className="form-control"
          value={form.password}
          onChange={(e) => updateForm({ password: e.target.value })}
        />
        <label className="form-label" htmlFor="passwordInput">
          Password
        </label>
      </div>

      {/*  Submit button  */}
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Login
      </button>

      {/*  Register buttons  */}
      <div className="text-center">
        <p>
          Not a member? <Link to="/register">Sign Up Here</Link>
        </p>
      </div>
    </form>
  );
};
