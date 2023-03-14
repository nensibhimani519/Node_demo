import { takeLatest, call, put } from "redux-saga/effects";
import { getServicesApiCall } from "./apiCalls";
import { getServicesFailure, getServicesSuccess } from "./actions";
import { GET_SERVICES_REQUEST } from "./actionTypes";

function* getServicesWorker({ payload }) {
  try {
    const response = yield call(getServicesApiCall, payload);
    yield put(getServicesSuccess(response.data.data));
  } catch (error) {
    console.log(error.message);
    yield put(getServicesFailure({ error }));
  }
}

export function* servicesWatcher() {
  yield takeLatest(GET_SERVICES_REQUEST, getServicesWorker);
}
