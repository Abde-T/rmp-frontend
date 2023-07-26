import { AUTH, SIGNIN_FAILURE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(form);
    dispatch({ type: AUTH, data });
    navigate('/posts');
  } catch (error) {
    console.log(error);
    dispatch({ type: SIGNIN_FAILURE, error: error.response.data.message });
  }
};

export const signup = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(form);
    dispatch({ type: AUTH, data });
    navigate('/posts');
  } catch (error) {
    console.log(error);
  }
};
