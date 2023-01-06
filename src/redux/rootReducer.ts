import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./cart/reducer";

export default combineReducers({
  authReducer,
  cartReducer,
});
