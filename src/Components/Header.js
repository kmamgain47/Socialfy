import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export const Header = (props) => {
  // list of all rooms for search bar
  const [roomData, setRoomData] = useState([]);
  useEffect(() => {
    async function getRooms() {
      const response = await fetch(`https://social-fy.herokuapp.com/getRoomData`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const rooms = await response.json();
      var roomNameList = [];
      rooms.forEach((room) => {
        roomNameList.push({
          _id: room._id,
          roomName: room.roomName,
        });
      });
      setRoomData(roomNameList);
    }
    getRooms();
  }, []);

  // get names of rooms
  var data = [];
  const navigate = useNavigate();
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            SocialFy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Create
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/createpost">
                      Post
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/createroom">
                      Room
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div>
              <SearchBar data={roomData} />
            </div>
            <button
              className="btn btn-primary bt-sm mx-1"
              onClick={() => {
                {
                  props.userData === undefined
                    ? navigate("/login")
                    : navigate("/profile");
                }
              }}
            >
              {props.userData === undefined ? "Login" : "Profile"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
