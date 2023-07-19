import React from "react";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <div className="details__container">
      <div className="row">
        <h2 className="details__title" data-aos="fade-in">How It Works:</h2>
        <div className="details__wrapper">
          <div className="detail" data-aos="fade-right">
            <h2> create an account </h2>
            <Link to={'/home'}>
            <button> START NOW </button>
            </Link>
          </div>
          <div className="detail" data-aos="fade-up">
            <h2> Upload your Portfolio </h2>
            <Link to={'/home'}>
            <button> UPLOAD NOW </button>
            </Link>
          </div>
          <div className="detail" data-aos="fade-left">
            <h2> GET FEEDBACK </h2>
            <Link to={'/home'}>
            <button> JOIN NOW </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
