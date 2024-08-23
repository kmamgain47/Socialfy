import React, { useState } from "react";
import { CommentListArea } from "./CommentListArea";
import { CommentInput } from "./CommentInput";

// commentList,commentData
export const Comment = (props) => {
  const [commentSection, setCommentSection] = useState(0);
  const [replySection, setReplySection] = useState(0);

  var cardstyle = {
    background: "white",
    border: "1px solid black",
    borderRadius: "6px",
    padding: "3px",
    margin: "2px 0px",
  };
  var reply = {
    position: "relative",
    left: "20px",
  };
  return (
    <div>
      <div className="postCard" style={cardstyle}>
        <div className="commentHead">{props.commentData.userID}</div>
        <hr />
        <div className="commentBody">{props.commentData.content}</div>
        <hr />
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={() => {
            if (commentSection === 0) setCommentSection(1);
            else setCommentSection(0);
          }}
        >
          Show Replies
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (replySection === 0) setReplySection(1);
            else setReplySection(0);
          }}
        >
          Reply
        </button>
      </div>
      <div>
        {replySection === 1 && (
          <div>
            <CommentInput
              parentID={props.commentData._id}
              postID={props.commentData.postID}
              userID={props.userData._id}
              updateData={props.updateData}
            />
          </div>
        )}
        {commentSection === 1 && (
          <div className="reply" style={reply}>
            <CommentListArea
              userData={props.userData}
              updateData={props.updateData}
              commentList={props.commentList}
              parentID={props.commentData._id}
            />
          </div>
        )}
      </div>
    </div>
  );
};
