import { Divider, Menu, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { MuiChipsInput } from "mui-chips-input";
import SearchIcon from '@mui/icons-material/Search';
import { getPostsBySearch } from "../actions/posts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const PhoneSearchMenu = () => {
  const [anchorel, setAnchorel] = React.useState(null);
  const open_ = Boolean(anchorel);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handleOpen = (event) => {
    setAnchorel(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorel(null);
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
    <div className="phone__search">
      <div className="search-box-icon">
        <button
          className="btn-icon-content"
          onClick={handleOpen}
          aria-controls={open ? "search-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <SearchIcon/>
        </button>
      </div>
      <Menu
        anchorEl={anchorel}
        id="search-menu"
        open={open_}
        onClose={handleClose}
        PaperProps={{
          elevation: 10,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            boxShadow: "-4px -4px #242424",
            mt: -12,
            ml: 3,
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
          <TextField
            label="Search..."
            className="input"
            onKeyDown={handleKeyPress}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
           <button className="btn-icon-content" onClick={searchPost}>
             <SearchIcon />
           </button>
        </MenuItem>
        <Divider />
        <MenuItem>
          <MuiChipsInput
            className="phone__input_tags"
            value={tags}
            onChange={handleChange}
            label="Search Tags"
          />
           <button className="btn-icon-content" onClick={searchPost}>
             <SearchIcon />
          </button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PhoneSearchMenu;
