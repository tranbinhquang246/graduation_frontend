import React from "react";
import { connect } from "react-redux";
import { handleError } from "../service";
import axiosConfig from "../axiosInterceptor/AxioConfig";

const DeliveryCart = (props: any) => {
  const handleDeleteAddress = async () => {
    props?.setLoading(true);
    try {
      await axiosConfig.delete(
        `${process.env.REACT_APP_API_URL}address-delivery/${props?.data.id}`
      );
    } catch (error) {
      handleError(error);
    } finally {
      props?.setHandleAddressSuccess(!props?.handleAddressSuccess);
    }
  };
  return (
    <div className="w-full flex justify-between p-2 my-5 border-b-2">
      <p className="w-[80%] overflow-hidden">{`${props?.data.address},${props?.data.commune},${props?.data.district},${props?.data.province}`}</p>
      <div className="flex text-xs w-[110px] justify-end text-blue-500 hover:text-[#1e293b]">
        <p
          className="text-blue-500 hover:text-[#1e293b] hover:cursor-pointer"
          onClick={handleDeleteAddress}
        >
          Delete
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryCart);
