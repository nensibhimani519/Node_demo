import { takeLatest, call, put } from "redux-saga/effects";
import { getSaloonsApiCall } from "./apiCalls";
import { getCategoriesFailure, getCategoriesSuccess } from "./actions";
import { GET_CATEGORIES_REQUEST } from "./actionTypes";

function* getCategoriesWorker({ payload }) {
  try {
    const response = yield call(getSaloonsApiCall, payload);
    yield put(getCategoriesSuccess(response.data.data));
  } catch (error) {
    console.log(error.message);
    yield put(getCategoriesFailure({ error }));
  }
}

export function* categoriesWatcher() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategoriesWorker);
}
