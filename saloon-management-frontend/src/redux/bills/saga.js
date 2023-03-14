import { takeLatest, call, put } from "redux-saga/effects";
import { getBillsApiCall } from "./apiCalls";
import { getBillsFailure, getBillsSuccess } from "./actions";
import { GET_BILLS_REQUEST } from "./actionTypes";

function* getBillsWorker({ payload }) {
  try {
    const response = yield call(getBillsApiCall, payload);
    yield put(getBillsSuccess(response.data.data));
  } catch (error) {
    console.log(error.message);
    yield put(getBillsFailure({ error }));
  }
}

export function* billsWatcher() {
  yield takeLatest(GET_BILLS_REQUEST, getBillsWorker);
}
