import React from "react";
import { connect } from "react-redux";

const DeliveryCart = (props: any) => {
  const handleDeleteAddress = () => {};
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
