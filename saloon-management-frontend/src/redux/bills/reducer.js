import { GET_BILLS_SUCCESS, GET_BILLS_FAILURE } from "./actionTypes";

const initialState = {
  bills: [],
  count: 0,
  loading: true,
  failed: false,
  error: {},
};

function billsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_BILLS_SUCCESS:
      return {
        ...state,
        bills: payload.list,
        count: payload.count,
        failed: false,
        loading: false,
      };

    case GET_BILLS_FAILURE:
      return {
        ...state,
        failed: true,
        bills: [],
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
}

export default billsReducer;
