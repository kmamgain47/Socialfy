import React, { useState, useEffect } from "react";
import { CommentListArea } from "./CommentListArea";

// postData
export const CommentArea = (props) => {
  const [commentDataList, setCommentDataList] = useState([]);
  useEffect(() => {
    async function getCommentData() {
      const response = await fetch(
        `https://social-fy.herokuapp.com/getCommentsList/${props.postData._id}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const commentData = await response.json();
      setCommentDataList(commentData);
    }
    getCommentData();
  }, [props.postData]);
  var areastyle = {
    maxHeight: "600px",
    overflow: "scroll",
  };
  return (
    <div className="CommentArea" style={areastyle}>
      {props.postData.comments.length === 0 ? (
        "Soo lonely here! try writing a comment"
      ) : commentDataList.length === 0 ? (
        "waiting for server"
      ) : (
        <CommentListArea
          commentList={commentDataList}
          parentID={null}
          userData={props.userData}
          updateData={props.updateData}
        />
      )}
    </div>
  );
};
