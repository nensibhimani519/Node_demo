import {
  GET_BILLS_FAILURE,
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
} from "./actionTypes";

// NOTES

export const getBillsRequest = (payload) => {
  return {
    type: GET_BILLS_REQUEST,
    payload,
  };
};

export const getBillsSuccess = (payload) => {
  return {
    type: GET_BILLS_SUCCESS,
    payload,
  };
};

export const getBillsFailure = (payload) => {
  return {
    type: GET_BILLS_FAILURE,
    payload,
  };
};
