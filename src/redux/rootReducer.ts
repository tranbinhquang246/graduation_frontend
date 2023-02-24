import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./cart/reducer";
import { loadingReducer } from "./loading/reducer";
import { userInforReducer } from "./user-infor/reducer";
import { orderReducer } from "./order/reducer";
import { evaluationReducer } from "./evaluation/reducer";

export default combineReducers({
  authReducer,
  cartReducer,
  loadingReducer,
  userInforReducer,
  orderReducer,
  evaluationReducer,
});
