import React, { useState } from "react";
import { useNavigate } from "react-router";

// userData
export default function CreateRoom(props) {
  const navigate = useNavigate();
  // check in user is logged in
  if (props.userData === undefined) {
    const message = "You must be LoggedIn to create a Room";
    window.alert(message);
    navigate("/login");
  }

  // form to store values
  const [form, setForm] = useState({
    roomName: "",
    description: "",
  });

  // update form on change
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // new post object
    const newPost = { ...form };
    // request to make a new room
    const response = await fetch(
      `https://social-fy.herokuapp.com/createRoom/${props.userData._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }
    ).catch((error) => {
      window.alert(error);
      return;
    });

    // make user join the room
    var roomID = (await response.json()).insertedId;
    var bodyString = JSON.stringify({
      userID: props.userData._id,
      roomID: roomID,
    });
    await fetch(`https://social-fy.herokuapp.com/joinRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyString,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({
      roomName: "",
      description: "",
    });

    // update user data
    props.updateData();
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Make a New Room</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group my-1">
          <label htmlFor="roomName">Room Name</label>
          <input
            type="text"
            className="form-control"
            id="roomName"
            value={form.roomName}
            onChange={(e) => updateForm({ roomName: e.target.value })}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="description">Description</label>
          <textarea
            rows={3}
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group my-1">
          <input
            type="submit"
            value="Create Room"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
