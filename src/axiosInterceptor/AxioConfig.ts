import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const axiosConfig = axios.create({
  baseURL: BASE_URL,
});
axiosConfig.interceptors.request.use(async (config) => {
	const token = localStorage.getItem("jwt_token");
  const clonedConfig = { ...config };
  clonedConfig.headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    clonedConfig.headers["Authorization"] = `Bearer ${token}`;
  }
  return clonedConfig;
});

export default axiosConfig;
