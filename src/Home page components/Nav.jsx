import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Form from "./form/Form";
import { Avatar, Divider, IconButton } from "@mui/material";
import UsersLoading from "../ui/UsersLoading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as actionType from "../constants/actionTypes";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { MuiChipsInput } from "mui-chips-input";
import { getPostsBySearch } from "../actions/posts";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import PhoneSortMenu from "../ui/PhoneSortMenu";
import PhoneSearchMenu from "../ui/PhoneSearchMenu";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";

const Nav = ({ currentID, setCurrentId }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [Open, setOpen] = React.useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/posts");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleChange = (newTags) => {
    setTags(newTags);
  };

  return (
    <nav className="nav__container">
      <Link to={"/posts"}>
        <img src={logo} className="SideBar__logo" alt="RMP logo" />
      </Link>
      <div className="search">
        <div className="search-box">
          <div className="search-field">
            <TextField
              label="Search..."
              className="input_tags"
              onKeyDown={handleKeyPress}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="standard"

            />
            <Divider 
             orientation="vertical"
             flexItem sx={{ borderRightWidth: 3 }} 
             style={{ background: '#24242493', 
             boxShadow:'2px 2px #242424',
             borderRadius:'4px'
            }}
            />

            <MuiChipsInput
              size="small"
              className="input_tags"
              value={tags}
              onChange={handleChange}
              label="Search Tags"
              variant="standard"
            />

            <div className="search-box-icon">
              <button className="btn-icon-content" onClick={searchPost}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
        <PhoneSortMenu />
        <PhoneSearchMenu />
      </div>
      {user ? (
        <>
          <div className="user__wrapper">
            <button className="button-confirm hide" onClick={HandleOpen}>
              Upload
            </button>
            <Modal open={Open} onClose={HandleClose}>
              <div className="upload__modal">
                <Form currentID={currentID} setCurrentId={setCurrentId} />
              </div>
            </Modal>
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                className="user__icon"
                alt={user?.result.name}
                src={user?.result.selectedFile}
                sx={{ width: 40, height: 40 }}
                style={{
                  backgroundColor: "#242424",
                  fontSize: "30px",
                }}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  boxShadow: "4px 4px #242424",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Link to={`/creators/${user?.result.name}`}>
                  <div className="user__name">
                    {" "}
                    <PersonIcon /> Profile{" "}
                  </div>
                </Link>
              </MenuItem>
              <MenuItem>
                <button className="button-confirm none" onClick={HandleOpen}>
                  Upload
                </button>
              </MenuItem>
              <Divider />
              <MenuItem>
                <div className="div__button button-confirm" onClick={logout}>
                  Logout
                </div>
              </MenuItem>
            </Menu>
          </div>
        </>
      ) : <UsersLoading /> ? (
        <Link to={"/auth"}>
          <button className="button-confirm login">
            <LoginIcon />
          </button>
          <button className="button-confirm signin_button">Sign in</button>
        </Link>
      ) : null}
    </nav>
  );
};

export default Nav;
