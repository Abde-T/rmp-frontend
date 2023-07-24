import React, { useEffect, useState } from "react";
import CardLoadingstate from "../ui/CardLoadingstate";
import Post from "../Home page components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Home page components/Nav";
import SideBar from "../Home page components/SideBar";
import {  getPosts } from "../actions/posts";


const Projects = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { sortBy } = useSelector((state) => state.filter)
  const [currentID, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentID, dispatch]);

  const filteredPosts = posts.sort((a, b) => {
    if (sortBy === "likes") {
      return b.likes.length - a.likes.length;
    } else if (sortBy === "most_commented") {
      return b.comments.length - a.comments.length;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  console.log(filteredPosts)

  return (
    <>
      <Nav currentID={currentID} setCurrentId={setCurrentId} />
      <SideBar />
      <div className="projects__container">
              <div className="cards-">
          {isLoading
            ? (new Array(8)
                .fill(0)
                .map((_, index) => <CardLoadingstate key={index} />)
            ):( filteredPosts.map((post, index) => (
                <Post
                  currentID={currentID}
                  post={post}
                  setCurrentId={setCurrentId}
                  key={index}
                />
              )))}
        </div>
      </div>
    </>
  );
};

export default Projects;
