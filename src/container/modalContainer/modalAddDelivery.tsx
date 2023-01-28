import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { Modal } from "antd";
import { setOpenModalAddAddress } from "../../redux/user-infor/action";

export const modalAddDelivery: React.FC<Props> = ({
  isOpenModalAddAddress,
  setOpenModalAddAddress,
}) => {
  const handleOk = () => {
    setOpenModalAddAddress(false);
  };

  const handleCancel = () => {
    setOpenModalAddAddress(false);
  };
  return (
    <Modal
      title="Add Address Delivery"
      open={isOpenModalAddAddress}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    isOpenModalAddAddress: state.userInforReducer.isOpenModalAddAddress,
  };
};

const mapDispatchToProps = { setOpenModalAddAddress };

export default connect(mapStateToProps, mapDispatchToProps)(modalAddDelivery);
