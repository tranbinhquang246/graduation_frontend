import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { Avatar } from "antd";
import { IMAGES } from "../../assets";
import { decodeJwt } from "../../service";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MdOutlineDeliveryDining,
  MdOutlineAccountCircle,
  MdList,
  MdOutlineFavoriteBorder,
  MdDeleteOutline,
} from "react-icons/md";
import { setOpenModalDeleteAccount } from "../../redux/auth/actions";
import { ModalAddDelivery, ModalDeleteAccount } from "../modalContainer";

const AccountPage: React.FC<Props> = ({
  userInfor,
  isAuthenticated,
  setOpenModalDeleteAccount,
}) => {
  const decodedJwt = decodeJwt();
  const navigate = useNavigate();
  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/login");
    //   return;
    // }
  }, []);
  const handleDeleteAccount = () => {
    setOpenModalDeleteAccount(true);
  };

  return (
    <div className="w-full flex flex-col md:flex-row mt-[56px] font-ubuntu p-5">
      <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
        {userInfor?.avatar ? (
          <Avatar shape="circle" size={120} src={userInfor.avatar} />
        ) : (
          <Avatar shape="square" size="large" src={IMAGES.userImage} />
        )}
        {userInfor?.firstName || userInfor?.lastName ? (
          <p className="font-medium text-2xl text-slate-600 mt-2">{`${userInfor?.firstName} ${userInfor?.lastName}`}</p>
        ) : (
          <p className="font-medium text-2xl text-slate-800 mt-2">USER</p>
        )}
        <p className="font-light text-sm text-slate-500 mt-1">
          {decodedJwt?.email}
        </p>
        <div className="w-2/3 mt-2 h-[1px] bg-slate-400"></div>
        <div
          className="flex w-1/2 mt-2 text-sm hover:cursor-pointer items-center hover:scale-105 transition duration-300"
          onClick={() => {
            navigate("/account");
          }}
        >
          <MdOutlineAccountCircle
            style={{
              width: "38px",
              color: "white",
              fontSize: "38px",
              margin: "5px",
              padding: "5px",
              backgroundColor: "#1e293b",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />

          <p>Account</p>
        </div>
        <div
          className=" w-1/2 flex text-sm hover:cursor-pointer hover:scale-105 items-center transition duration-300"
          onClick={() => {
            navigate("edit-address");
          }}
        >
          <MdOutlineDeliveryDining
            style={{
              width: "38px",
              color: "white",
              fontSize: "38px",
              margin: "5px",
              padding: "5px",
              backgroundColor: "#1e293b",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
          <p>Delivery address</p>
        </div>
        <div
          className=" w-1/2 flex text-sm hover:cursor-pointer hover:scale-105 items-center transition duration-300"
          onClick={() => {
            navigate("ordered");
          }}
        >
          <MdList
            style={{
              width: "38px",
              color: "white",
              fontSize: "38px",
              margin: "5px",
              padding: "5px",
              backgroundColor: "#1e293b",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
          <p>Ordered</p>
        </div>
        <div
          className=" w-1/2 flex text-sm hover:cursor-pointer hover:scale-105 items-center transition duration-300"
          onClick={() => {
            navigate("favorite");
          }}
        >
          <MdOutlineFavoriteBorder
            style={{
              width: "38px",
              color: "white",
              fontSize: "38px",
              margin: "5px",
              padding: "5px",
              backgroundColor: "#1e293b",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
          <p>Favorite</p>
        </div>
        <div
          className=" w-1/2 flex text-sm hover:cursor-pointer hover:scale-105 items-center transition duration-300"
          onClick={handleDeleteAccount}
        >
          <MdDeleteOutline
            style={{
              width: "38px",
              color: "white",
              fontSize: "38px",
              margin: "5px",
              padding: "5px",
              backgroundColor: "#1e293b",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
          <p className="text-red-400">Deleted Account</p>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-2/3">
        <Outlet />
      </div>
      <ModalDeleteAccount />
      <ModalAddDelivery />
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    userInfor: state.userInforReducer.userInfor,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = { setOpenModalDeleteAccount };

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
