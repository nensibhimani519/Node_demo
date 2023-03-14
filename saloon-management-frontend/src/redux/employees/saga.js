import { takeLatest, call, put } from "redux-saga/effects";
import { getEmployeesApiCall } from "./apiCalls";
import { getEmployeesFailure, getEmployeesSuccess } from "./actions";
import { GET_EMPLOYEES_REQUEST } from "./actionTypes";

function* getEmployeesWorker({ payload }) {
  try {
    const response = yield call(getEmployeesApiCall, payload);
    yield put(getEmployeesSuccess(response.data.data));
  } catch (error) {
    console.log(error);
    yield put(getEmployeesFailure({ error }));
  }
}

export function* employeesWatcher() {
  yield takeLatest(GET_EMPLOYEES_REQUEST, getEmployeesWorker);
}
