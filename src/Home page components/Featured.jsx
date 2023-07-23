import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import CardLoadingstate from "../ui/CardLoadingstate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


const Featured = ({ currentID, setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const Posts = posts.sort((a, b) => b.comments?.length - a.comments?.length);
  console.log('post:', posts);
  

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
        zIndex:'10',
        border: "1px solid black",
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
    slidesToScroll: 3,
    initialSlide: 0,
    draggable: true,
// nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
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
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <div className="cardContainer">
        <div className="card__wrapper">
          <h1>Featured</h1>
          <Link to={"/posts/projects?page=1"}>
            <p>see more</p>
          </Link>
        </div>
        <div className="cards">
          {isLoading ? (
            renderLoadingStates()
          ) : (
            <Slider {...settings} className="flex ">
              {Posts?.map((post, index) => (
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

export default Featured;
