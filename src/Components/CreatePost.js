import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreatePost(props) {
  //check
  if (props.userData === undefined) {
    const message = "You must be LoggedIn to create a Post";
    window.alert(message);
    navigate("/login");
  }
  const navigate = useNavigate();

  var current = new Date();
  const [form, setForm] = useState({
    title: "",
    content: "",
    likes: [],
    uploadTime: current.toLocaleString(),
    room: "",
  });

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // on submission
  async function onSubmit(e) {
    e.preventDefault();

    const newPost = { ...form };
    newPost.room = document.getElementById("selectdrop").value;

    // create the post
    const response = await fetch(
      `https://social-fy.herokuapp.com/createPost/${props.userData._id}`,
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

    var postID = (await response.json()).insertedId;
    var bodyobj = JSON.stringify({
      roomID: newPost.room,
      userID: props.userData._id,
    });

    // add post to user and room list
    const response2 = await fetch(`https://social-fy.herokuapp.com/addPost/${postID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyobj,
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      title: "",
      content: "",
      likes: [],
      uploadTime: current.toLocaleString(),
      room: "",
    });
    props.updateData();
    navigate("/");
    return;
  }

  const [rooms, setRooms] = useState([]);

  // This method fetches the rooms from the database.
  useEffect(() => {
    async function getRooms() {
      if (props.userData.roomsJoined.length == 0) {
        const message = "You must join a room to Create a Post";
        window.alert(message);
        navigate("/");
        return;
      }
      const roomIDs = JSON.stringify(props.userData.roomsJoined);
      const response = await fetch(
        `https://social-fy.herokuapp.com/getRoomsList/${roomIDs}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const rooms = await response.json();
      setRooms(rooms);
    }

    getRooms();
    props.updateData();
  }, []);

  // map out rooms
  function roomList() {
    return rooms.map((room) => {
      return <option value={`${room._id}`}>{`${room.roomName}`}</option>;
    });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Make a New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group my-1">
          <select
            className="form-select"
            aria-label="Default select example"
            id="selectdrop"
          >
            <option selected>Choose a Room to Post In</option>
            {roomList()}
          </select>
        </div>
        <div className="form-group my-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="content">Content</label>
          <textarea
            rows={8}
            className="form-control"
            id="content"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className="form-group my-1">
          <input
            type="submit"
            value="Create Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
