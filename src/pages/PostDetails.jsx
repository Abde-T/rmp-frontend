import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../src/actions/posts";
import { CircularProgress, Divider } from "@mui/material";
import Nav from "../Home page components/Nav";
import SideBar from "../Home page components/SideBar";
import CommentSection from "../Home page components/CommentSection";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const PostDetails = ({ currentID, setCurrentId }) => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <>
        <Nav currentID={currentID} setCurrentId={setCurrentId} />
        <SideBar />
        <div className="loading">
          <CircularProgress />
        </div>
      </>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <>
      <Nav currentID={currentID} setCurrentId={setCurrentId} />
      <SideBar />
      <div className="post__container">
        <div className="post__wrapper">
          <div className="post__details">
            <div className="links">
            <h1>{post.title}</h1>
            <div className="posts__links">
              <Link to={post?.gitHub} target="_blank">
                <GitHubIcon className="post__icon"/>
              </Link>
              <Link to={post?.website} target="_blank">
                <OpenInNewIcon className="post__icon"/>
              </Link>
            </div>
            </div>
            <p>{post.tags?.map((tag) => `#${tag} `)}</p>
            <p>
              Created by:
                <span>{` ${post.name}`}</span>
            </p>
            <p>{post.message}</p>
            
            <p>{moment(post.createdAt).fromNow()}</p>
            <Divider style={{ margin: "20px 0" }} />
            <CommentSection post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className="post__image--wrapper">
            <img
              className="post__image"
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
  
          </div>
        </div>
        {recommendedPosts?.length && (
          <div className="recommendedPosts">
            <h1 variant="h5">You might also like:</h1>
            <Divider />
            <div className="recommendedPosts__wrapper">
              {recommendedPosts.map(
                ({ title, name, likes, selectedFile, _id, tags }) => (
                  <div
                    className="recommendedPost"
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <p variant="h6">{title}</p>
                    <p>{tags?.map((tag) => `#${tag} `)}</p>
                    <p variant="subtitle2">{name}</p>
                    <p variant="subtitle1">Likes: {likes?.length}</p>
                    <img src={selectedFile} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetails;
