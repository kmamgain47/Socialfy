import React, { useState, useEffect } from "react";
import { Comment } from "./Comment";

// commentList,parentID
export const CommentListArea = (props) => {
  // extract required comments
  const [comments, setComments] = useState([]);
  useEffect(() => {
    var filteredResult = [];
    if (props.parentID !== undefined) {
      props.commentList.forEach((comment) => {
        if (comment.parentID === props.parentID) {
          filteredResult.push(comment);
        }
      });
    } else {
      filteredResult = props.commentList;
    }
    setComments(filteredResult);
  }, [props.commentList]);
  return (
    <div className="postListArea">
      <div>
        {comments.map((comment) => (
          <Comment
            commentList={props.commentList}
            commentData={comment}
            userData={props.userData}
            updateData={props.updateData}
          />
        ))}
      </div>
    </div>
  );
};
