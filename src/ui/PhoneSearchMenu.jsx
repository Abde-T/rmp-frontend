import { Divider, Menu, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { MuiChipsInput } from "mui-chips-input";

const PhoneSearchMenu = () => {
  const [anchorel, setAnchorel] = React.useState(null);
  const open_ = Boolean(anchorel);
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
          <i className="search-icon">
            <svg
              xmlns="://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 512 512"
            >
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                fill="#fff"
              ></path>
            </svg>
          </i>
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
            ml: 12,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 168,
              right: 120,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
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
        </MenuItem>
        <Divider />
        <MenuItem>
          <MuiChipsInput
            className="phone__input_tags"
            value={tags}
            onChange={handleChange}
            label="Search Tags"
            onKeyDown={handleKeyPress}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PhoneSearchMenu;
