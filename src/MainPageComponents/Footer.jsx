import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer__container">
        <div className="row">
          <div className="footer__wrapper">
            <div className="col1">
              <img src={logo} className="footer__logo" alt="RMP logo" />
              <p>Copyright &copy; 2023 RMP</p>
            </div>
            <div className="col">
              <h1>Company</h1>
              <ul>
                <li>About</li>
                <li>Mission</li>
                <li>Services</li>
                <li>Social</li>
                <li>Get in touch</li>
              </ul>
            </div>
            <div className="col">
              <h1>Products</h1>
              <ul>
                <li>About</li>
                <li>Services</li>
                <li>Get in touch</li>
              </ul>
            </div>
            <div className="col">
              <h1>Accounts</h1>
              <ul>
                <li>About</li>
                <li>Services</li>
                <li>Social</li>
                <li>Get in touch</li>
              </ul>
            </div>
            <div className="col">
              <h1>Resources</h1>
              <ul>
                <li>About</li>
                <li>Services</li>
                <li>Social</li>
              </ul>
            </div>
            <div className="col">
              <h1>Support</h1>
              <ul>
                <li>Contact us</li>
                <li>Web chat</li>
                <li>Open ticket</li>
              </ul>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
