import {
  GET_SALOONS_REQUEST,
  GET_SALOONS_SUCCESS,
  GET_SALOONS_FAILURE,
} from "./actionTypes";

// NOTES

export const getSaloonsRequest = (payload) => {
  return {
    type: GET_SALOONS_REQUEST,
    payload,
  };
};

export const getSaloonsSuccess = (payload) => {
  return {
    type: GET_SALOONS_SUCCESS,
    payload,
  };
};

export const getSaloonsFailure = (payload) => {
  return {
    type: GET_SALOONS_FAILURE,
    payload,
  };
};
