import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { PostFilter } from "./PostFilter";

// allPostDataList
export default function Home(props) {
  const navigate = useNavigate();
  if (props.userData === undefined) {
    navigate("/login");
  }
  const [postDataList, setPostDataList] = useState([]);
  useEffect(() => {
    var filterlist = [];
    props.allPostDataList.forEach((post) => {
      if (props.userData.roomsJoined.includes(post.room)) {
        filterlist.push(post);
      }
    });
    setPostDataList(filterlist);
  }, []);

  return (
    <div>
      <Tabs className="justify-content-center" defaultActiveKey="first">
        <Tab eventKey="first" title="Home Feed">
          <div>
            <h5>Your Personal Feed</h5>
            {postDataList.length === 0 ? (
              "Soo loney here! start by making a post or joining a room or Check out Latest Posts."
            ) : (
              <PostFilter
                postDataList={postDataList}
                userData={props.userData}
                updateData={props.updateData}
              />
            )}
          </div>
        </Tab>
        <Tab eventKey="second" title="Latest">
          <div>
            <h5>Stay upto Data with Latest Posts</h5>
            {props.allPostDataList === 0 ? (
              "Waiting for server"
            ) : (
              <PostFilter
                postDataList={props.allPostDataList}
                userData={props.userData}
                updateData={props.updateData}
              />
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
