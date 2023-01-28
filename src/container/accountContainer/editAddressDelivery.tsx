import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { DeliveryCartComponent } from "../../components";
import { setOpenModalAddAddress } from "../../redux/user-infor/action";

export const editAddressDelivery: React.FC<Props> = ({
  deliveryAddress,
  setOpenModalAddAddress,
}) => {
  const handleAddAddress = () => {
    setOpenModalAddAddress(true);
  };
  return (
    <div className="w-full md:mt-0 mt-10">
      <div className="flex justify-end sm:justify-between w-full">
        <p className="hidden sm:block font-medium border-b-2 border-[#1e293b]">
          Delivery Address
        </p>
        <button
          className="text-xs border-2 p-2 rounded-sm border-[#1e293b] hover:text-white hover:bg-[#1e293b]"
          onClick={handleAddAddress}
        >
          Add new address
        </button>
      </div>
      {deliveryAddress.length ? (
        <>
          {deliveryAddress.map((element, index) => {
            return <DeliveryCartComponent data={element} key={index} />;
          })}
        </>
      ) : (
        <p>Nothing</p>
      )}
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    deliveryAddress: state.userInforReducer.deliveryAddress,
  };
};

const mapDispatchToProps = { setOpenModalAddAddress };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editAddressDelivery);
