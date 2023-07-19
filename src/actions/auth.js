import { AUTH, FETCH_ALL_USERS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(form);
    dispatch({ type: AUTH, data });
    navigate('/posts');
  } catch (error) {
    console.log(error);
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

export const getUsers = () => async (dispatch) => {
  try {
    
    const response  = await api.fetchUsers();

    dispatch({ type: FETCH_ALL_USERS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};