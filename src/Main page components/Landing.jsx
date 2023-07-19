import React from "react";
import code from "../assets/code.gif";
import logo from "../assets/logo.png";
import "./MainPage.css";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="landing__container">
      <div className="row">
        <nav className="main__nav">
          <img src={logo} className="logo" alt="RMP logo"  data-aos="fade-down" />
        </nav>
        <div className="landing__wrapper">
          <div className="containerGlitch">
            <h1 className="landing__phrase" data-aos="fade-right">
              Transform Your Portfolio Experience: Engage with a Supportive
              Community on<span className="glitch" id="textGlitch"> Review My Portfolio
              </span> and Witness the Difference.
            </h1>
          </div>
          <img src={code} className="code" alt="gif" data-aos="fade-left"/>
        </div>
        <Link to={'/posts'}>
        <button className="landing__button" data-aos="fade-up"> Level up your portfolio - Join now! </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
