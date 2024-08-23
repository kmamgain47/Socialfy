import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// components
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Profile } from "./Components/Profile";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { About } from "./Components/About";
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import CreateRoom from "./Components/CreateRoom";
import { ViewRoomData } from "./Components/ViewRoomData";
import { ViewUser } from "./Components/ViewUser";

function App() {
  // style
  var postStyle = {
    margin: "auto",
    width: "60vw",
    // border: "2px solid black",
    padding: "3px 0px",
    minHeight: "calc(100vh - 150px)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };
  // get userID if already logedIn
  var userData;

  function setData(data) {
    if (data !== undefined) {
      localStorage.setItem("socialFyUserData", JSON.stringify(data));
    }
    if (localStorage.getItem("socialFyUserData") !== null) {
      userData = JSON.parse(localStorage.getItem("socialFyUserData"));
    }
  }
  const [updateReq, setUpdateReq] = useState(0);
  function updateData() {
    if (updateReq == 0) setUpdateReq(1);
    else setUpdateReq(0);
  }

  setData(userData);

  const [postDataList, setPostDataList] = useState([]);
  useEffect(() => {
    async function getAllPost() {
      const response = await fetch(
        `https://social-fy.herokuapp.com/getPostData`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const postList = await response.json();
      var postId = [];
      postList.forEach((element) => {
        postId.push(element);
      });
      setPostDataList(postId);
    }
    getAllPost();

    async function update() {
      if (userData !== undefined) {
        const credentials = JSON.stringify({
          email: userData.email,
          password: userData.password,
        });
        const response = await fetch(
          `https://social-fy.herokuapp.com/checkCredentials/${credentials}`
        );
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const curUser = await response.json();
        setData(curUser);
      }
    }
    update();
  }, [updateReq]);
  return (
    <>
      <Router>
        <Header userData={userData} />
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  userData={userData}
                  allPostDataList={postDataList}
                  updateData={updateData}
                />
              }
            />
            <Route
              exact
              path="/room/:roomID"
              element={
                <ViewRoomData
                  userData={userData}
                  updateData={updateData}
                  postDataList={postDataList}
                />
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login setData={setData} />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              path="/createpost"
              element={
                <CreatePost userData={userData} updateData={updateData} />
              }
            />
            <Route
              path="/createroom"
              element={
                <CreateRoom userData={userData} updateData={updateData} />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  userData={userData}
                  postDataList={postDataList}
                  updateData={updateData}
                />
              }
            />
            <Route
              path="/user/:userID"
              element={
                <ViewUser updateData={updateData} postDataList={postDataList} />
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
