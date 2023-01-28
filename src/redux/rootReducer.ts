import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./cart/reducer";
import { loadingReducer } from "./loading/reducer";
import { userInforReducer } from "./user-infor/reducer";

export default combineReducers({
  authReducer,
  cartReducer,
  loadingReducer,
  userInforReducer,
});
