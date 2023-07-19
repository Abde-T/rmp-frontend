import {AUTH, FETCH_ALL_USERS, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case FETCH_ALL_USERS:
        return { ...state, users: action.payload, };
    default:
      return state;
  }
};

export default authReducer;