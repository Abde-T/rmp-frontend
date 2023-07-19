import React, { useEffect, useState } from "react";
import CardLoadingstate from "../ui/CardLoadingstate";
import Post from "../Home page components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Home page components/Pagination";
import { useLocation } from "react-router-dom";
import Nav from "../Home page components/Nav";
import SideBar from "../Home page components/SideBar";
import { getAllPosts } from "../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Projects = () => {
  const { posts } = useSelector((state) => state.posts);
  const [currentID, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  console.log(posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [currentID, dispatch]);

  const query = useQuery();
  const page = query.get("page") || 1;
  const [tags, setTags] = useState([]);
  const searchQuery = query.get("searchQuery");

  return (
    <>
      <Nav currentID={currentID} setCurrentId={setCurrentId} />
      <SideBar />
      <div className="projects__container">
        <div className="cards-">
          {!posts?.length > 0
            ? new Array(8)
                .fill(0)
                .map((_, index) => <CardLoadingstate key={index} />)
            : posts.map((post) => (
                <div className="grid_layout">
                  <Post
                    currentID={currentID}
                    post={post}
                    setCurrentId={setCurrentId}
                    key={post._id}
                  />
                </div>
              ))}
        </div>
        {!searchQuery && !tags.length && (
          <div className="page">
            <Pagination page={page} />
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
