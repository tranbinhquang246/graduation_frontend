import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./cart/reducer";
import { loadingReducer } from "./loading/reducer";

export default combineReducers({
  authReducer,
  cartReducer,
  loadingReducer,
});
