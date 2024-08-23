import React, { useState, useEffect } from "react";
import { ViewRoom } from "./ViewRoom";
import { useParams, useNavigate } from "react-router";

export const ViewRoomData = (props) => {
  const params = useParams();
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://social-fy.herokuapp.com/getRoom/${params.roomID}`
      ).catch((error) => {
        window.alert(error);
        return;
      });
      var room = await response.json();
      setRoomData(room);
    }
    getData();
  }, [props.userData]);

  return (
    <div>
      {roomData == undefined ? (
        "waiting for server"
      ) : (
        <ViewRoom
          updateData={props.updateData}
          userData={props.userData}
          roomData={roomData}
          postDataList={props.postDataList}
        />
      )}
    </div>
  );
};
