import { GET_SERVICES_SUCCESS, GET_SERVICES_FAILURE } from "./actionTypes";

const initialState = {
  services: [],
  count: 0,
  loading: true,
  failed: false,
  error: {},
};

function servicesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: payload.list,
        count: payload.count,
        failed: false,
        loading: false,
      };

    case GET_SERVICES_FAILURE:
      return { ...state, failed: true, loading: false, error: payload.error };

    default:
      return state;
  }
}

export default servicesReducer;
