import React, { useEffect, useState } from "react";
import SideBar from "../Home page components/SideBar";
import Featured from "../Home page components/Featured";
import Nav from "../Home page components/Nav";
import Developers from "../Home page components/Developers";
import NewProjects from "../Home page components/NewProjects";
import RandomProject from "../Home page components/RandomPosts";

function HomePage({ currentID, setCurrentId }) {
  

  return (
    <>
      <SideBar />
      <Nav currentID={currentID} setCurrentId={setCurrentId} />
      <div className="HomePage__container">
          <Featured currentID={currentID} setCurrentId={setCurrentId} />
          {/* <Developers /> */}
          <NewProjects currentID={currentID} setCurrentId={setCurrentId} />
          <RandomProject currentID={currentID} setCurrentId={setCurrentId}/>
      </div>
    </>
  );
}

export default HomePage;
