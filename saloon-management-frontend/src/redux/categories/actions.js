import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "./actionTypes";

// NOTES

export const getCategoriesRequest = (payload) => {
  return {
    type: GET_CATEGORIES_REQUEST,
    payload,
  };
};

export const getCategoriesSuccess = (payload) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload,
  };
};

export const getCategoriesFailure = (payload) => {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload,
  };
};
