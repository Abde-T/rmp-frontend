import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import PersonIcon from "@mui/icons-material/Person";
import SortIcon from "@mui/icons-material/Sort";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes";
import { setFilterCriteria } from "../reducers/filterActions";

const SideBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  const [filterValue, setFilterValue] = useState("newest");

  const handleFilterChange = (value) => {
    setFilterValue(value);
    dispatch(setFilterCriteria(value));
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
          <NavItem eventKey="sort" value={filterValue}>
            <NavIcon
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SidebarLink Icon={SortIcon} />
            </NavIcon>
            <NavText
              style={{
                fontFamily: "Glitch Goblin",
                color: "#242424",
              }}
            >
              Sort by:
            </NavText>
            <NavItem
              eventKey="sort/Newest"
              onClick={() => {
                handleFilterChange("newest");
              }}
            >
              <NavText
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#242424",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                Newest
              </NavText>
            </NavItem>
            <NavItem
              eventKey="sort/MostLiked"
              onClick={() => {
                handleFilterChange("likes");
              }}
            >
              <NavText
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#242424",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                Most Liked
              </NavText>
            </NavItem>
            <NavItem
              eventKey="sort/MostCommented"
              onClick={() => {
                handleFilterChange("most_commented");
              }}
            >
              <NavText
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#242424",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                Most Commented
              </NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="info">
            <NavIcon
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            >
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
