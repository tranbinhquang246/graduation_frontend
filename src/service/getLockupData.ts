import axiosConfig from "../axiosInterceptor/AxioConfig";
import handleError from "./handleError";

const getLockUpData = async () => {
  try {
    const type = await axiosConfig.get(
      `${process.env.REACT_APP_API_URL}lookup-data/type`
    );
    const design = await axiosConfig.get(
      `${process.env.REACT_APP_API_URL}lookup-data/design`
    );
    const material = await axiosConfig.get(
      `${process.env.REACT_APP_API_URL}lookup-data/material`
    );
    const brand = await axiosConfig.get(
      `${process.env.REACT_APP_API_URL}lookup-data/brand`
    );
    const color = await axiosConfig.get(
      `${process.env.REACT_APP_API_URL}lookup-data/color`
    );
    return {
      type: type?.data,
      design: design?.data,
      material: material?.data,
      brand: brand?.data,
      color: color?.data,
    };
  } catch (error) {
    handleError(error);
    return null;
  }
};

export default getLockUpData;
