import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import tabReducer from "./tab.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  tabs: tabReducer,
});

export default rootReducer;
