import React, { useState } from "react";

export const CommentInput = (props) => {
  const [form, setForm] = useState({
    content: "",
    postID: props.postID,
    parentID: props.parentID,
    userID: props.userID,
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // on submission
  async function Submit(e) {
    e.preventDefault();

    const newPost = { ...form };

    // create the post
    const response = await fetch(
      `https://social-fy.herokuapp.com/createComment/${props.userID}`,
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

    var commentID = (await response.json()).insertedId;

    var bodyobj = JSON.stringify({
      commentID: commentID,
      postID: props.postID,
      userID: props.userID,
    });

    // add post to user and room list
    const response2 = await fetch(`https://social-fy.herokuapp.com/addComment`, {
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
      content: "",
      postID: props.postID,
      parentID: props.parentID,
      userID: props.userID,
    });
    props.updateData();
  }

  return (
    <div className="CommentInput">
      <form>
        <div className="mb-3">
          <textarea
            placeholder="Write your Comment Here"
            rows={1}
            className="form-control"
            id="content"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={Submit}>
          Post
        </button>
      </form>
    </div>
  );
};
