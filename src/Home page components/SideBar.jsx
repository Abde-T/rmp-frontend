import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes";

const SideBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  return (
    <div className="SideBar__container">
      <SideNav
        defaultselected="home"
        className="SideBar__nav"
        style={{
          backgroundColor: "#e6e6e7",
          padding: "20px 0",
          textAlign: "center",
          color: "#242424",
          boxShadow: "2px 102px 0 1.5px #242424",
        }}
      >
        <SideNav.Toggle
          style={{
            filter: "invert()",
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem
            eventKey="home"
            style={{
              margin: "16px 0",
            }}
          >
            <NavIcon>
              <Link to={"/posts"}>
                <SidebarLink Icon={HomeIcon} />
              </Link>
            </NavIcon>
            <NavText
              style={{
                fontFamily: "Glitch Goblin",
                color: "#242424",
              }}
            >
              Home
            </NavText>
          </NavItem>

          <NavItem eventKey="info" >
            <NavIcon>
              <SidebarLink Icon={PersonIcon} />
            </NavIcon>
            <NavText
              style={{
                fontFamily: "Glitch Goblin",
                color: "#242424",
              }}
            >
              Profile
            </NavText>
            <NavItem eventKey="info/profile">
              <NavText
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link to={`/creators/${user?.result.name}`}>
                  <div className="user__name"> {user?.result.name} </div>
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="info/Logout">
              <NavText
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="div__button side__button" onClick={logout}>
                  Logout
                </div>
              </NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

function SidebarLink({ text, Icon }) {
  return (
    <li className="icon__list">
      <Icon className="icon" />
      <span className="icon__text">{text}</span>
    </li>
  );
}
export default SideBar;
