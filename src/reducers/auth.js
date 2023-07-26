import { AUTH, LOGOUT, SIGNIN_FAILURE } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case SIGNIN_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
