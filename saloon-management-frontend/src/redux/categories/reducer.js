import { GET_CATEGORIES_FAILURE, GET_CATEGORIES_SUCCESS } from "./actionTypes";

const initialState = {
  categories: [],
  count: 0,
  loading: true,
  failed: false,
  error: {},
};

function categoriesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...payload,
        failed: false,
        loading: false,
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        failed: true,
        categories: [],
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
}

export default categoriesReducer;
