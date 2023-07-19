import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const getDevelopers = (array) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if(array.length>0){
      const { name, creator } = array[i][0];
      result.push({ name, creator });
    }
  }

  return result;
};

const Developers = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const developers = getDevelopers(posts);
  console.log(posts);
  console.log(developers);

  return (
    <>
      <div className="devContainer">
        <div className="dev__wrapper">
          <h1>Developers</h1>
          <p>see more</p>
        </div>
        <div className="card_load_">
          {isLoading
            ? new Array(4).fill(0).map((_, index) => (
                <div className="card-" key={index}>
                  <div className="card_load"></div>
                  <div className="card_load_extreme_title"></div>
                  <div className="card_load_extreme_descripion"></div>
                </div>
              ))
            : developers.map((dev, index) => (
                <div className="dev_card-" key={index}>
                  <Avatar
                    className="user__icon"
                    alt={dev.name}
                    sx={{ width: 40, height: 40 }}
                    style={{
                      backgroundColor: "#242424",
                      fontSize: "30px",
                    }}
                  >
                    {dev.name.charAt(0)}
                  </Avatar>
                  <div className="dev__name">
                    <Link to={`/creators/${dev.name}`}>
                      <p>{dev.name}</p>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Developers;
