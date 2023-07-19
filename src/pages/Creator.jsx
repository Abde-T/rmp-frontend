import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPostsByCreator, getPostsBySearch } from "../actions/posts";
import { Avatar, CircularProgress } from "@mui/material";
import Post from "../Home page components/Post/Post";
import Nav from "../Home page components/Nav";
import SideBar from "../Home page components/SideBar";

const Creator = ({ currentID, setCurrentId }) => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/tags")) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts.length && !isLoading) return "No posts";

  return (
    <>
      <Nav currentID={currentID} setCurrentId={setCurrentId} />
      <SideBar />
      <div className="creatorPosts__container">
      <div className="creatorPosts__wrapper">
        <div className="creatorPosts__details">
          <div className="creatorPosts_">
            <Avatar
              className="user__icon"
              alt={name}
              sx={{ width: 50, height: 50 }}
              style={{
                backgroundColor: "#242424",
                fontSize: "40px",
              }}
            >
              {name.charAt(0)}
            </Avatar>
            <div className="creator_credentials">
            <h1>{name}</h1>
            <p>@{name}</p>
            </div>
          </div>
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div className="creatorPost__wrapper">
            {posts?.map((post) => (
              <div key={post._id}>
                <Post 
                  currentID={currentID}
                  post={post}
                  setCurrentId={setCurrentId} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Creator;
