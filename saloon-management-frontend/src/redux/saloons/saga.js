import { takeLatest, call, put } from "redux-saga/effects";
import { getSaloonsApiCall } from "./apiCalls";
import { getSaloonsFailure, getSaloonsSuccess } from "./actions";
import { GET_SALOONS_REQUEST } from "./actionTypes";

function* getSaloonsWorker({ payload }) {
  try {
    const response = yield call(getSaloonsApiCall, payload);
    yield put(getSaloonsSuccess(response.data.data));
  } catch (error) {
    console.log(error.message);
    yield put(getSaloonsFailure({ error }));
  }
}

export function* saloonsWatcher() {
  yield takeLatest(GET_SALOONS_REQUEST, getSaloonsWorker);
}
