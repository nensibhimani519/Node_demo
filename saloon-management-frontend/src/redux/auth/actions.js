import { BILLING_DATA_KEY, LOCAL_STORAGE_USER, socket } from "../../util";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

// LOGIN

export const userLoginRequest = (payload, navigate, dispatch) => {
  return {
    type: USER_LOGIN_REQUEST,
    payload: { payload, navigate, dispatch },
  };
};

export const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
  };
};

export const userLoginFailure = (payload) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload,
  };
};

// USER

export const getUserRequest = (payload) => {
  return {
    type: GET_USER_REQUEST,
    payload,
  };
};

export const getUserSuccess = (payload) => {
  return {
    type: GET_USER_SUCCESS,
    payload,
  };
};

export const getUserFailure = (payload) => {
  return {
    type: GET_USER_FAILURE,
    payload,
  };
};
/**
 * DSIPATCHING THIS IS NOT REQUIRED
 * 
 * Clears the localstorage and replaces the url to `/login`
 */
export const userLogout = async () => {
  localStorage.removeItem(LOCAL_STORAGE_USER);
  localStorage.removeItem(BILLING_DATA_KEY);
  socket.disconnect()

  return window.location.replace("/login");
};
