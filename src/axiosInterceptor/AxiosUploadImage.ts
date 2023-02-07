import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const axiosConfigUploadImage = axios.create({
  baseURL: BASE_URL,
});
axiosConfigUploadImage.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("jwt_token");
  const clonedConfig = { ...config };
  clonedConfig.headers = {
    "Content-Type": "multipart/form-data",
  };
  if (token) {
    clonedConfig.headers["Authorization"] = `Bearer ${token}`;
  }
  return clonedConfig;
});

export default axiosConfigUploadImage;
