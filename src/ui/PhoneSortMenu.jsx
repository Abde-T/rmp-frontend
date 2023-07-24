import React, { useState } from 'react';
import SortIcon from "@mui/icons-material/Sort";
import { Divider, Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilterCriteria } from '../reducers/filterActions';

const PhoneSortMenu = () => {
    const dispatch = useDispatch();

    const [filterValue, setFilterValue] = useState('newest')

    const handleFilterChange = (value) => {
      setFilterValue(value);
      console.log(setFilterValue)
      dispatch(setFilterCriteria(value));
    };

    const [anrel, setAnrel] = React.useState(null);
    const op = Boolean(anrel);
  
    const handleSort = (event) => {
      setAnrel(event.currentTarget);
    };
    const handleClose = () => {
        setAnrel(null);
      };  
    return (
        <div className="phone__sort">
        <div className="sort-box-icon">
          <SortIcon
            className="btn-icon-content"
            onClick={handleSort}
            aria-controls={open ? "sort-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          />
        </div>
        <Menu
          anchorEl={anrel}
          id="sort-menu"
          open={op}
          onClose={handleClose}
          PaperProps={{
            elevation: 10,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              boxShadow: "-4px -4px #242424",
              mt: -12,
              ml: 8,
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
                top: 195,
                right: 70,
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
          <MenuItem onClick={() =>{handleFilterChange('newest')}}>Newest</MenuItem>
          <Divider />
          <MenuItem onClick={() =>{handleFilterChange('likes')}}>Most Liked</MenuItem>
          <Divider />
          <MenuItem onClick={() =>{handleFilterChange('most_commented')}}>Most commented</MenuItem>
        </Menu>
      </div>
    );
};

export default PhoneSortMenu;