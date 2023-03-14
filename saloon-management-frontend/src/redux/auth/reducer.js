import { LOCAL_STORAGE_USER } from "../../util";
import {
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  role: "",
  permissions: null,
  saloon: {
    id: null,
    name: "",
    location: "",
    createdAt: "",
    updatedAt: "",
    roomId: null,
  },
  loading: false,
  failed: false,
  ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER)),
  error: null,
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        error: null,
        failed: false,
        loading: false,
      };

    case USER_LOGIN_FAILURE:
      return { ...state, failed: true, loading: false, error: payload.error };

    //  USER
    case GET_USER_SUCCESS:
      return {
        ...state,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        contact_no: payload.contact_no,
        role_name: payload.role_name,
        permissions: payload.permissions,
        error: null,
        failed: false,
        loading: false,
      };

    case GET_USER_FAILURE:
      return { ...state, failed: true, loading: false, error: payload.error };

    default:
      return state;
  }
}

export default userReducer;
