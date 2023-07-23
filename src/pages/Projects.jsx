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
  const [filter, setFilter] = useState("newest");
  const { posts, isLoading } = useSelector((state) => state.posts);
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

  let sortedPosts = [];
  if (Array.isArray(posts)) {
    sortedPosts = [...posts];
    if (filter === "newest") {
      sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter === "likes") {
      sortedPosts.sort((a, b) => b.likes?.length - a.likes?.length);
    } else if (filter === "comments") {
      sortedPosts.sort((a, b) => b.comments?.length - a.comments?.length);
    }
  }
  return (
    <>
      <Nav currentID={currentID} setCurrentId={setCurrentId} />
      <SideBar />
      <div className="projects__container">
        <select
          className="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="likes">Likes</option>
          <option value="comments">Most Commented</option>
        </select>
        <div className="cards-">
          {isLoading
            ? new Array(8)
                .fill(0)
                .map((_, index) => <CardLoadingstate key={index} />)
            : sortedPosts.map((post, index) => (
                <Post
                  currentID={currentID}
                  post={post}
                  setCurrentId={setCurrentId}
                  key={index}
                />
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
