import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import tabReducer from "./tab.reducer";
import backendReducer from "./backend.reducer";
import roleReducer from "./role.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  tabs: tabReducer,
  backends: backendReducer,
  roles: roleReducer,
});

export default rootReducer;
