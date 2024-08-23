import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Register = () => {
  var current = new Date();

  // form template which will be given to database
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    dateOfJoining: current.toJSON().slice(0, 10),
  });
  const navigate = useNavigate();

  //Update the form
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // on submission.
  async function onSubmit(e) {
    e.preventDefault();

    const newUser = { ...form };
    // request to database
    await fetch("https://social-fy.herokuapp.com/createUser/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      userName: "",
      email: "",
      password: "",
      dateOfJoining: current.toJSON().slice(0, 10),
    });
    navigate("/");
  }

  return (
    <form onSubmit={onSubmit}>
      {/*  userName input  */}
      <div className="form-outline mb-4">
        <input
          type="text"
          id="usernameInput"
          className="form-control"
          value={form.userName}
          onChange={(e) => updateForm({ userName: e.target.value })}
        />
        <label className="form-label" htmlFor="usernameInput">
          User Name
        </label>
      </div>
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
      {/*  password input  */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="passwordInput"
          className="form-control"
          value={form.password}
          onChange={(e) => updateForm({ password: e.target.value })}
        />
        <label className="form-label" htmlFor="passwordInput">
          password
        </label>
      </div>
      {/*  Submit button  */}
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Register
      </button>
    </form>
  );
};
