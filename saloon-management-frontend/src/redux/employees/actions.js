import {
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
} from "./actionTypes";

// NOTES

export const getEmployeesRequest = (payload) => {
  return {
    type: GET_EMPLOYEES_REQUEST,
    payload,
  };
};

export const getEmployeesSuccess = (payload) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload,
  };
};

export const getEmployeesFailure = (payload) => {
  return {
    type: GET_EMPLOYEES_FAILURE,
    payload,
  };
};
