import React from "react";
import coder from "../assets/coder.gif";

const FormSection = () => {

  return (
    <div className="form__container">
      <div className="row">
        <div className="form__wrapper" >
          <img src={coder} className="coder" alt="coder gif" data-aos="fade-right"/>
          <h2 className="form__phrase" data-aos="fade-left">
            Your Portfolio Journey Starts Here: Join <span className="glitch" id="textGlitch">Review My Portfolio
            </span> and Embark on a Path of Continuous Improvement.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
