import React from "react";
import pc from "../assets/pc.gif";

const Info = () => {
  return (
      <div className="info__container">
        <div className="row">
          <div className="info__wrapper">
            <img src={pc} className="pc" alt="pc gif" data-aos="fade-right"/>
            <h2 className="info__phrase" data-aos="fade-left">
              Level Up Your Portfolio: Get Valuable Insights from the Community and Stand Out in the Crowd.
            </h2>
          </div>
        </div>
      </div>
  );
};

export default Info;
