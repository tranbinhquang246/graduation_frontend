import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { Avatar } from "antd";
import { IMAGES } from "../../assets";
import { decodeJwt, handleError } from "../../service";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MdOutlineDeliveryDining,
  MdOutlineAccountCircle,
  MdList,
  MdOutlineFavoriteBorder,
  MdDeleteOutline,
} from "react-icons/md";

import { setLoading } from "../../redux/loading/actions";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { toast } from "react-toastify";
import { ModalChangeAvatar, ModalDelete } from "../modalContainer";
import axiosConfigUploadImage from "../../axiosInterceptor/AxiosUploadImage";
import { setUserInforSuccess } from "../../redux/user-infor/action";

const AccountPage: React.FC<Props> = ({
  userInfor,
  isAuthenticated,
  setUserInforSuccess,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalChangeAvatar, setOpenModalChangeAvatar] = useState(false);
  const decodedJwt = decodeJwt();
  const navigate = useNavigate();
  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/login");
    //   return;
    // }
  }, []);

  const onDeleteAccount = async () => {
    setLoading(true);
    try {
      await axiosConfig.delete(
        `${process.env.REACT_APP_API_URL}user/delete/${userInfor?.userId}`
      );
      //   toast.success("Delete successfully", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      setOpenModal(false);
      localStorage.removeItem("jwt_token");
      window.location.href = "/";
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeAvatar = async (values: any) => {
    setUserInforSuccess(false);
    const formData = new FormData();
    formData.append("avatar", values.avatar.file);
    await axiosConfigUploadImage({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}user-infor/edit/${userInfor?.userId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(async (response) => {
        setOpenModalChangeAvatar(false);
        setUserInforSuccess(true);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="w-full flex flex-col md:flex-row mt-[56px] font-ubuntu p-5">
      <div className="flex flex-col w-full md:w-1/3 items-center">
        <div className="relative items-center">
          {userInfor?.avatar ? (
            <Avatar
              shape="circle"
              size={120}
              src={userInfor.avatar}
              className="w-[5rem] h-[5rem]"
            />
          ) : (
            <Avatar
              shape="square"
              size="large"
              src={IMAGES.userImage}
              className="w-[5rem] h-[5rem]"
            />
          )}
          <div className="absolute inset-0 bg-black rounded-full items-center opacity-0 transition-opacity duration-500 hover:opacity-80 hover:cursor-pointer">
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={() => {
                setOpenModalChangeAvatar(true);
              }}
            >
              <p className="text-white text-sm font-bold">Change</p>
            </div>
          </div>
        </div>
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
          onClick={() => {
            setOpenModal(true);
          }}
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
      <div className="flex flex-col w-full mt-5 md:w-2/3">
        <Outlet />
      </div>
      <ModalDelete
        open={openModal}
        onDelete={onDeleteAccount}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
      <ModalChangeAvatar
        open={openModalChangeAvatar}
        onCreate={onChangeAvatar}
        onCancel={() => {
          setOpenModalChangeAvatar(false);
        }}
      />
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

const mapDispatchToProps = { setUserInforSuccess };

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
