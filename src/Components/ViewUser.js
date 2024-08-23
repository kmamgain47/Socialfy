import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";

export const ViewUser = (props) => {
  const params = useParams();
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function getUserData() {
      const response = await fetch(
        `https://social-fy.herokuapp.com/getUser/${params.userID}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const data = await response.json();
      setUserData(data);
    }
    getUserData();
  }, []);
  return (
    <div>
      {userData === undefined ? (
        "waiting for server"
      ) : (
        <Profile
          userData={userData}
          postDataList={props.postDataList}
          updateData={props.updateData}
        />
      )}
    </div>
  );
};
