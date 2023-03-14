import { combineReducers } from "redux";
import userReducer from "./auth/reducer";
import billsReducer from "./bills/reducer";
import categoriesReducer from "./categories/reducer";
import employeesReducer from "./employees/reducer";
import saloonsReducer from "./saloons/reducer";
import servicesReducer from "./services/reducer";
import socketReducer from "./socket/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  services: servicesReducer,
  saloons: saloonsReducer,
  categories: categoriesReducer,
  bills: billsReducer,
  socket: socketReducer,
  employees: employeesReducer
});

export default rootReducer;
