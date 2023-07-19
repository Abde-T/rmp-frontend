import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <div className="row">
          <div className="footer__wrapper">
            <img src={logo} className="footer__logo" alt="RMP logo" />
            <p>Copyright &copy; 2023 RMP</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
