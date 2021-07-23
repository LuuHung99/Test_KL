import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import tabReducer from "./tab.reducer";
import backendReducer from "./backend.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  tabs: tabReducer,
  backends: backendReducer,
});

export default rootReducer;
