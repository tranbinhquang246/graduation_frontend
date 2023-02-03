import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { OrderPayload } from "./type";

export const addOrder = (data: OrderPayload) => {
  return axiosConfig.post(`${process.env.REACT_APP_API_URL}orders`, data);
};

export const updateOrder = (data: any) => {
  return axiosConfig.patch(
    `${process.env.REACT_APP_API_URL}cart-detail/${data?.id}`,
    { quantity: data?.quantity }
  );
};
