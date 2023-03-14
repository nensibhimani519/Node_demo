import { GET_SALOONS_SUCCESS, GET_SALOONS_FAILURE } from "./actionTypes";

const initialState = {
  saloons: [],
  count: 0,
  loading: true,
  failed: false,
  error: {},
};

function saloonsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_SALOONS_SUCCESS:
      return {
        ...state,
        saloons: payload.list,
        count: payload.count,
        failed: false,
        loading: false,
      };

    case GET_SALOONS_FAILURE:
      return { ...state, failed: true, loading: false, error: payload.error };

    default:
      return state;
  }
}

export default saloonsReducer;
