import { GET_EMPLOYEES_FAILURE, GET_EMPLOYEES_SUCCESS } from "./actionTypes";

const initialState = {
  employees: [],
  count: 0,
  loading: true,
  failed: false,
  error: {},
};

function employeesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: payload.list,
        failed: false,
        loading: false,
      };

    case GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        failed: true,
        employees: [],
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
}

export default employeesReducer;
