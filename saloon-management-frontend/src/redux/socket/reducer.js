import {
  GET_SOCKET_SUCCESS,
  GET_SOCKET_FAILURE,
  SET_CUSTOMER_SOCKET_ID,
  SET_ADMIN_SOCKET_ID,
} from "./actionTypes";

const initialState = {
  socket: null,
  loading: true,
  failed: false,
  customerSocketId: null,
  adminSocketId: null,
  error: {},
};

function socketReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_SOCKET_SUCCESS:
      return {
        ...state,
        socket: payload,
        failed: false,
        loading: false,
      };

    case GET_SOCKET_FAILURE:
      return {
        ...state,
        failed: true,
        socket: null,
        loading: false,
        error: payload.error,
      };

    case SET_CUSTOMER_SOCKET_ID:
      return {
        ...state,
        customerSocketId: payload,
      };
      
    case SET_ADMIN_SOCKET_ID:
      return {
        ...state,
        adminSocketId: payload,
      };

    default:
      return state;
  }
}

export default socketReducer;
