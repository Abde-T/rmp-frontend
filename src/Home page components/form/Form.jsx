import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Resizer from "react-image-file-resizer";

const Form = ({ currentID, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    gitHub: "",
    website: "",
    tags: [],
    selectedFile: "",
  });
  console.log(postData);
  const navigate = useNavigate();
  const post = useSelector((state) =>
    currentID
      ? state.posts.posts.find((message) => message._id === currentID)
      : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      gitHub: "",
      website: "",
      tags: [],
      selectedFile: "",
    });
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleFileChange = (file) => {
    Resizer.imageFileResizer(
      file,
      500, // maxWidth
      500, // maxHeight
      "JPEG", // compressFormat
      80, // quality (0 to 100)
      0, // rotation (0, 90, 180, or 270)
      (uri) => {
        setPostData({ ...postData, selectedFile: uri });
      },
      "base64" // outputType: "base64" | "blob" | "file"
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentID === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(updatePost(currentID, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  
  return (
    <>
      <form className="nav__form" onSubmit={handleSubmit} autoComplete="off">
        <div name="title">
          {currentID ? `Editing "${post.title}"` : "Upload project"}
        </div>
        <input
          type="text"
          placeholder="Project title"
          name="ProjectName"
          className="input_"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="Description"
          name="Description"
          className="input_ input__desc"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></textarea>

        <div className="icon__inputs">
          <div className="icon__box">
            <GitHubIcon />
            <input
              type="text"
              placeholder="GitHub"
              name="gitHub"
              className="icon__input"
              value={postData.gitHub}
              onChange={(e) =>
                setPostData({ ...postData, gitHub: e.target.value })
              }
            />{" "}
          </div>
          <div className="icon__box">
            <AddLinkIcon />
            <input
              type="text"
              placeholder="Website"
              name="website"
              className="icon__input"
              value={postData.website}
              onChange={(e) =>
                setPostData({ ...postData, website: e.target.value })
              }
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="tags"
          name="tags"
          className="input_"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className="form__buttons">
          <div className="input__button">
            <input
              type="file"
              name="selectedFile"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              />
          </div>
          <button className="button-confirm" type="button" onClick={clear}>
            Clear
          </button>
        </div>
        <button type="submit" className="button-confirm" id="post__button">
          Post →
        </button>
      </form>
    </>
  );
};

export default Form;
