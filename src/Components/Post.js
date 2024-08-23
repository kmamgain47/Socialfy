import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CommentArea } from "./CommentArea";
import { CommentInput } from "./CommentInput";

// props=postData
export const Post = (props) => {
  // style
  var myStyle = {
    backgroundColor: "#f7f7f7",
    border: "2px solid black",
    width: "100%",
    minHeight: "200px",
    display: "flex",
  };
  var likeStyle = {
    display: "flex",
  };
  var postInfo = {
    display: "flex",
  };

  // fetch
  // usename from userID
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [color, setColor] = useState();
  const [commentSection, setCommentSection] = useState(0);

  useEffect(() => {
    async function setName() {
      const response = await fetch(
        `https://social-fy.herokuapp.com/getUser/${props.postData.OP}`
      );
      const response2 = await fetch(
        `https://social-fy.herokuapp.com/getRoom/${props.postData.room}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      if (!response2.ok) {
        const message = `An error occurred: ${response2.statusText}`;
        window.alert(message);
        return;
      }
      const userData = await response.json();
      setUser(userData);
      const roomData = await response2.json();
      setRoom(roomData);
    }
    setName();

    function loadColor() {
      if (props.postData.likes.includes(props.userData._id)) {
        setColor("#ff1f4f");
      } else {
        setColor("#e8e8e8");
      }
    }
    loadColor();
  }, [props.postData]);

  async function click() {
    if (props.postData.likes.includes(props.userData._id)) {
      // remove the like by current user on current post
      const response = await fetch(
        "https://social-fy.herokuapp.com/removeLike",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: props.userData._id,
            post: props.postData._id,
          }),
        }
      ).catch((error) => {
        window.alert(error);
        return;
      });
    } else {
      // add the like by current user on current post
      const response = await fetch("https://social-fy.herokuapp.com/addLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: props.userData._id,
          post: props.postData._id,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });
    }
    props.updatePost();
    // update the current post
  }
  function showComments() {
    if (commentSection === 0) setCommentSection(1);
    else setCommentSection(0);
  }

  var colorStyle = {
    color: color,
  };
  var make_clear = {
    backgroundColor: "#ffffff00",
    border: "none",
  };
  // roomname from room id
  return (
    <div className="card my-1" style={myStyle}>
      <div className="card-body">
        <div className="PostInfo" style={postInfo}>
          <div className="mx-1">
            {room == undefined ? (
              "room Name Here"
            ) : (
              <Link to={`/room/${room._id}`}>{`${room.roomName}`}</Link>
            )}
          </div>
          <div className="mx-1">
            by -{/* user abhi banaya nahi hai */}
            {user == undefined ? (
              "user Name Here"
            ) : (
              <Link to={`/user/${user._id}`}>{`${user.userName}`}</Link>
            )}
          </div>
          <div className="postTime">{props.postData.time}</div>
        </div>
        <hr />
        <h5 className="card-title">{props.postData.title}</h5>
        <hr />
        <div className="card-content">{props.postData.content}</div>
        <hr />
        <div className="LikeArea" style={likeStyle}>
          <button
            onClick={() => {
              click();
            }}
            style={make_clear}
          >
            {/* change color */}
            <i className="fa fa-solid fa-heart fa-2x" style={colorStyle}></i>
          </button>
          {/* change my-2 later not a good fix */}
          <div className="likeCount px-3 my-2">
            {props.postData.likes.length}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              showComments();
            }}
          >
            comments
          </button>
        </div>
      </div>
      <hr />
      <div className="Comments">
        {commentSection === 1 ? (
          <div>
            <CommentInput
              userID={props.userData._id}
              postID={props.postData._id}
              parentID={null}
              updateData={props.updateData}
            />
            <hr />
            <CommentArea
              postData={props.postData}
              userData={props.userData}
              updateData={props.updateData}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
