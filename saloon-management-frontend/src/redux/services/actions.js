import {
  GET_SERVICES_FAILURE,
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
} from "./actionTypes";

// NOTES

export const getServicesRequest = (payload) => {
  return {
    type: GET_SERVICES_REQUEST,
    payload,
  };
};

export const getServicesSuccess = (payload) => {
  return {
    type: GET_SERVICES_SUCCESS,
    payload,
  };
};

export const getServicesFailure = (payload) => {
  return {
    type: GET_SERVICES_FAILURE,
    payload,
  };
};
