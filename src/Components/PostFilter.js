import { Post } from "./Post";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// postData
export const PostFilter = (props) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(0);

  useEffect(() => {
    props.updateData();
  }, [like]);

  function updateLike() {
    if (like == 0) setLike(1);
    else setLike(0);
  }

  // display the posts
  return (
    <div className="PostArea">
      {props.postDataList.length === 0
        ? "Oops so lonely Here, start by making a Post"
        : props.postDataList.map((post) => {
            return (
              <Post
                postData={post}
                userData={props.userData}
                updatePost={updateLike}
                updateData={props.updateData}
              />
            );
          })}
    </div>
  );
};
