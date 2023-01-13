import axiosConfig from "../../axiosInterceptor/AxioConfig";
import {
  CardDetailIDPayload,
  CartPayload,
  UpdateQuantityPayload,
} from "./type";

export const addCart = (data: CartPayload) => {
  return axiosConfig.post(`${process.env.REACT_APP_API_URL}cart-detail`, data);
};

export const updateQuantityCart = (data: UpdateQuantityPayload) => {
  return axiosConfig.patch(
    `${process.env.REACT_APP_API_URL}cart-detail/${data?.id}`,
    { quantity: data?.quantity }
  );
};

export const removeCartDetail = (data: CardDetailIDPayload) => {
  return axiosConfig.delete(
    `${process.env.REACT_APP_API_URL}cart-detail/${data?.cardDetailId}`
  );
};
