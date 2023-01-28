import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { Modal } from "antd";
import { setOpenModalDeleteAccount } from "../../redux/auth/actions";

const modalDeleteAccount: React.FC<Props> = ({
  isOpenModalDeleteAccount,
  setOpenModalDeleteAccount,
}) => {
  const handleOk = () => {
    setOpenModalDeleteAccount(false);
  };

  const handleCancel = () => {
    setOpenModalDeleteAccount(false);
  };
  return (
    <Modal
      title="Delete Account"
      open={isOpenModalDeleteAccount}
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
    isOpenModalDeleteAccount: state.authReducer.isOpenModalDeleteAccount,
  };
};

const mapDispatchToProps = {
  setOpenModalDeleteAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(modalDeleteAccount);
