import { all, fork } from "redux-saga/effects";
import { userWatcher } from "./auth/saga";
import { billsWatcher } from "./bills/saga";
import { categoriesWatcher } from "./categories/saga";
import { employeesWatcher } from "./employees/saga";
import { saloonsWatcher } from "./saloons/saga";
import { servicesWatcher } from "./services/saga";
import { socketWatcher } from "./socket/saga";

function* rootSaga() {
  yield all([
    fork(userWatcher),
    servicesWatcher(),
    saloonsWatcher(),
    categoriesWatcher(),
    billsWatcher(),
    fork(socketWatcher),
    employeesWatcher()
  ]);
}

export default rootSaga;
