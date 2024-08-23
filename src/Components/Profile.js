import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { PostFilter } from "./PostFilter";
import { CommentListArea } from "./CommentListArea";

export const Profile = (props) => {
  const navigate = useNavigate();

  if (props.userData === undefined) {
    const message = "You must be LoggedIn to view your profile";
    window.alert(message);
    navigate("/login");
  }
  const [commentList, setCommentList] = useState(props.userData.commentMade);
  const [roomList, setRoomList] = useState([]);
  const [postDataList, setPostDataList] = useState([]);

  useEffect(() => {
    props.updateData();
    async function getRooms() {
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
      setRoomList(rooms);
    }
    getRooms();

    async function getComments() {
      const response = await fetch(
        `https://social-fy.herokuapp.com/getUserCommentsList/${props.userData._id}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const comments = await response.json();
      setCommentList(comments);
    }
    getComments();

    function filterPosts() {
      var filteredResult = [];
      props.postDataList.forEach((post) => {
        if (props.userData.postMade.includes(post._id))
          filteredResult.push(post);
      });
      setPostDataList(filteredResult);
    }
    filterPosts();
  }, []);
  var area = {
    maxHeight: "600px",
    overflow: "scroll",
  };
  return (
    <div style={{ display: "block", width: 700, padding: 30 }}>
      <div className="page-head">
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Switch User
        </button>
      </div>
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Posts">
          <PostFilter
            updateData={props.updateData}
            postDataList={postDataList}
            userData={props.userData}
          />
        </Tab>
        <Tab eventKey="second" title="Comments">
          {commentList.length === 0 ? (
            "Soo lonely Here, start by making a Comment"
          ) : (
            <div style={area}>
              <CommentListArea
                commentList={commentList}
                userData={props.userData}
                updateData={props.updateData}
              />
            </div>
          )}
        </Tab>
        <Tab eventKey="third" title="Rooms">
          {roomList.length === 0
            ? "Soo lonely Here, start by making/joining a room"
            : roomList.map((room) => {
                return (
                  <div>
                    <Link to={`/room/${room._id}`}>{`${room.roomName}`}</Link>
                  </div>
                );
              })}
        </Tab>
      </Tabs>
    </div>
  );
};
