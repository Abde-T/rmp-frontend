import { combineReducers } from "redux";

import filterReducer from './filterReducer';
import posts from './posts'
import auth from "./auth";

export default combineReducers({ posts , auth,  filter: filterReducer})