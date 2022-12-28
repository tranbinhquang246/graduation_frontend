import axios from "axios";
import { LoginPayload, SignupPayload } from "./type";

export const login = (data: LoginPayload) => {
  return axios.post(`${process.env.REACT_APP_API_URL}auth/login`, data);
};

export const signup = (data: SignupPayload) => {
  return axios.post(`${process.env.REACT_APP_API_URL}auth/register`, data);
};
