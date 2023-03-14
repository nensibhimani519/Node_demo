import { takeLatest, call, put } from "redux-saga/effects";
import { createSocket } from "./apiCalls";
import { getSocketFailure, getSocketSuccess } from "./actions";
import { GET_SOCKET_REQUEST } from "./actionTypes";

function* getSocketWorker({ payload }) {
  try {
    const response = yield call(createSocket);
    yield put(getSocketSuccess(response));
  } catch (error) {
    console.log(error.message);
    yield put(getSocketFailure({ error }));
  }
}

export function* socketWatcher() {
  yield takeLatest(GET_SOCKET_REQUEST, getSocketWorker);
}
