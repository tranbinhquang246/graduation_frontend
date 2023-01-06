import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { CartPayload } from "./type";

export const addCart = (data: CartPayload) => {
  return axiosConfig.post(`${process.env.REACT_APP_API_URL}cart-detail`, data);
};
