import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PostFilter } from "./PostFilter";
// roomID
export const ViewRoom = (props) => {
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    function loadBtn() {
      if (props.roomData.memberID.includes(props.userData._id)) {
        setIsJoined(1);
      } else {
        setIsJoined(0);
      }
    }
    loadBtn();

    function filterPosts() {
      var filteredResult = [];
      props.postDataList.forEach((post) => {
        if (props.roomData.postID.includes(post._id)) filteredResult.push(post);
      });
      setPostList(filteredResult);
    }
    filterPosts();
  }, [props.roomData]);

  async function click() {
    if (props.roomData.memberID.includes(props.userData._id)) {
      // remove user from room
      const response = await fetch("https://social-fy.herokuapp.com/leaveRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: props.userData._id,
          roomID: props.roomData._id,
        }),
      }).catch((error) => {
        window.alert(error);
      });
    } else {
      // join the room
      const response = await fetch("https://social-fy.herokuapp.com/joinRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: props.userData._id,
          roomID: props.roomData._id,
        }),
      }).catch((error) => {
        window.alert(error);
      });
    }
    props.updateData();
  }

  var myStyle = {
    display: "flex",
  };
  var rightstyle = {
    float: "right",
  };
  return (
    <div>
      {props.roomData === undefined ? (
        "Waiting for server..."
      ) : (
        <div>
          <div className="head">
            <h3>{props.roomData.roomName}</h3>
            <div>
              <div> Number of Users- {props.roomData.memberID.length}</div>
              <div style={rightstyle}>
                <button
                  className="btn btn-primary bt-sm mx-1"
                  onClick={() => {
                    click();
                  }}
                >
                  {isJoined == 1 ? "Leave Room" : "Join Room"}
                </button>
              </div>
            </div>
            <div>
              <p>{props.roomData.description}</p>
            </div>
          </div>
          <div className="content">
            <PostFilter
              updateData={props.updateData}
              postDataList={postList}
              userData={props.userData}
            />
          </div>
        </div>
      )}
    </div>
  );
};
