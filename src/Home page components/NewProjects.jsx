import React from "react";
import CardLoadingstate from "../ui/CardLoadingstate";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";


const NewProjects = ({ currentID, setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const newPosts = posts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const renderLoadingStates = () =>
  new Array(4).fill(0).map((_, index) => <CardLoadingstate key={index} />);
  
  const SampleNextArrow = ({ style, onClick }) => (
    <div
      style={{
        ...style,
        filter: "invert()",
        fontSize: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale: "1.9",
      }}
      onClick={onClick}
    />
  );
  
  const SamplePrevArrow = ({ style, onClick }) => (
    <div
      style={{
        ...style,
        filter: "invert()",
        fontSize: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale: "1.9",
      }}
      onClick={onClick}
    />
  );
  
  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    arrows: true,
    speed: 1500,
    autoplaySpeed: 10,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    draggable: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  
  return (
    <>
      <div className="newContainer">
        <div className="card__wrapper">
          <h1>Latest Projects</h1>
          <Link to={"/posts/projects?page=1"}>
            <p>see more</p>
          </Link>
        </div>
        <div className="cards">
          {isLoading ? (
            renderLoadingStates()
          ) : (
            <Slider {...settings} key="slider" className="flex ">
              {newPosts?.map((post, index) => (
                <Post
                  currentID={currentID}
                  post={post}
                  setCurrentId={setCurrentId}
                  key={index}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};

export default NewProjects;
