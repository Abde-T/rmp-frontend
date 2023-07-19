import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../actions/posts";
const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (page) {
      dispatch(getAllPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="standard"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts/projects?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
