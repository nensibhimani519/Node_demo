import {
  GET_SOCKET_FAILURE,
  GET_SOCKET_REQUEST,
  GET_SOCKET_SUCCESS,
  SET_ADMIN_SOCKET_ID,
  SET_CUSTOMER_SOCKET_ID,
} from "./actionTypes";

// NOTES

export const getSocketRequest = (payload) => {
  return {
    type: GET_SOCKET_REQUEST,
    payload,
  };
};

export const getSocketSuccess = (payload) => {
  return {
    type: GET_SOCKET_SUCCESS,
    payload,
  };
};

export const getSocketFailure = (payload) => {
  return {
    type: GET_SOCKET_FAILURE,
    payload,
  };
};

export const setCustomerSocketId = (payload) => {
  return {
    type: SET_CUSTOMER_SOCKET_ID,
    payload,
  };
};

export const setAdminSocketId = (payload) => {
  return {
    type: SET_ADMIN_SOCKET_ID,
    payload,
  };
};
