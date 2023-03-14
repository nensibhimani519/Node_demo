import { takeLatest, call, put } from "redux-saga/effects";
import {
  LOCAL_STORAGE_USER as LOCAL_STORAGE_USER_KEY,
  USER_TYPES,
} from "../../util";
import { getUserApiCall, loginApiCall } from "./apiCalls";
import {
  getUserFailure,
  getUserSuccess,
  userLoginFailure,
  userLoginSuccess,
} from "./actions";
import { GET_USER_REQUEST, USER_LOGIN_REQUEST } from "./actionTypes";
import { toast } from "react-toastify";

function* userWorker({ payload }) {
  try {
    const response = yield call(loginApiCall, payload.payload);
    if (!response.data) return null;
    localStorage.setItem(
      LOCAL_STORAGE_USER_KEY,
      JSON.stringify(response.data.data)
    );
    yield put(userLoginSuccess(response.data.data));
    if (response.data?.data?.role === USER_TYPES.ADMIN) {
      return payload.navigate("/billing");
    } else if (response.data?.data?.role === USER_TYPES.CUSTOMER) {
      return payload.navigate("/user");
    }
    payload.navigate("/");
  } catch (error) {
    console.log(error.message);
    toast.error(error?.response?.data?.message || error.message);
    yield put(userLoginFailure({ error }));
  }
}

function* getUserWorker({ payload }) {
  try {
    const response = yield call(getUserApiCall, payload);

    // keep the user token and other information and update the existing user with new data
    let userData = {
      ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)),
      ...response.data.data,
      permissions: response.data?.data?.permissions,
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
    yield put(getUserSuccess(userData));
  } catch (error) {
    console.log(error.message);
    yield put(getUserFailure({ error }));
  }
}

export function* userWatcher() {
  yield takeLatest(USER_LOGIN_REQUEST, userWorker);
  yield takeLatest(GET_USER_REQUEST, getUserWorker);
}
