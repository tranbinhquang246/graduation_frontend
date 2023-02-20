/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { IMAGES } from "../assets";
import { NavLink } from "react-router-dom";
import { Avatar, Badge, Dropdown } from "antd";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { SiAboutdotme } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import {
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { RootState } from "../redux/store";
import Loading from "./Loading";

export const HeaderSection: React.FC<Props> = ({
  userInfor,
  quantityCart,
  userRole,
}) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.removeItem("jwt_token");
    window.location.reload();
  };

  const items: MenuProps["items"] = [];
  if (userRole === "admin") {
    items.push(
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              navigate("/account");
            }}
          >
            Edit Account
          </a>
        ),
        icon: <EditOutlined />,
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Manager
          </a>
        ),
        icon: <GoldOutlined />,
      },
      {
        key: "3",
        label: (
          <a target="_blank" rel="noopener noreferrer" onClick={handleClick}>
            Sign Out
          </a>
        ),
        icon: <LogoutOutlined />,
      }
    );
  } else {
    items.push(
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              navigate("/account");
            }}
          >
            Edit Account
          </a>
        ),
        icon: <EditOutlined />,
      },
      {
        key: "2",
        label: (
          <a target="_blank" rel="noopener noreferrer" onClick={handleClick}>
            Sign Out
          </a>
        ),
        icon: <LogoutOutlined />,
      }
    );
  }

  return (
    <div className="flex fixed z-50 h-[56px] w-full justify-between bg-[#001529]">
      <Loading />
      <img
        src={IMAGES.logoApp}
        alt="logo"
        className="h-full w-[50px] p-1 ml-4 hidden sm:block"
      ></img>
      <div className=" flex justify-start ml-5 sm:ml-0 sm:justify-center items-center h-full w-full">
        <div className="flex m-2 h-full items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center h-full text-blue-300 text-sm text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-300"
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover:duration-300"
            }
          >
            <p className="hidden md:block">Homepage</p>
            <AiFillHome
              className="md:hidden"
              style={{ width: 22, height: 22 }}
            />
          </NavLink>
        </div>

        <div className="flex m-2 h-full items-center">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "flex items-center h-full text-blue-300 text-sm text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-300"
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover:duration-300"
            }
          >
            <p className="hidden md:block">Products</p>
            <AiFillShopping
              className="md:hidden"
              style={{ width: 22, height: 22 }}
            />
          </NavLink>
        </div>
        <div className="flex m-2 h-full items-center">
          <NavLink
            to="/about-me"
            className={({ isActive }) =>
              isActive
                ? "flex items-center h-full text-blue-300 text-sm text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-300"
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover:duration-300"
            }
          >
            <p className="hidden md:block">About Me</p>
            <SiAboutdotme
              className="md:hidden"
              style={{ width: 22, height: 22 }}
            />
          </NavLink>
        </div>
        <div className="flex m-2 h-full items-center">
          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              isActive
                ? "flex items-center h-full text-blue-300 text-sm text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-300"
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover:duration-300"
            }
          >
            <p className="hidden md:block">Track Order</p>
            <MdLocationPin
              className="md:hidden"
              style={{ width: 22, height: 22 }}
            />
          </NavLink>
        </div>
        <div className="flex m-2 h-full items-center">
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? "flex items-center h-full text-blue-300 text-sm text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-300"
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover:duration-300"
            }
          >
            <p className="hidden md:block">Blog</p>
            <FaBloggerB
              className="md:hidden"
              style={{ width: 20, height: 20 }}
            />
          </NavLink>
        </div>
      </div>
      {userRole ? (
        <div className="flex mr-3 items-center justify-center">
          <Badge
            count={quantityCart}
            color="#52c41a"
            overflowCount={10}
            size="small"
            className="mr-5"
          >
            <BsFillCartFill
              style={{ width: 22, height: 22, color: "white" }}
              className="hover:cursor-pointer"
              onClick={() => {
                navigate("/cart");
              }}
            />
          </Badge>
          <Dropdown menu={{ items }}>
            {userInfor?.avatar ? (
              <Avatar shape="square" size="large" src={userInfor.avatar} />
            ) : (
              <Avatar shape="square" size="large" src={IMAGES.userImage} />
            )}
          </Dropdown>
        </div>
      ) : (
        <div className="flex mr-3 items-center justify-center">
          <Avatar
            className="hover:cursor-pointer"
            shape="square"
            size="large"
            icon={<UserOutlined />}
            onClick={() => {
              navigate("/login");
            }}
          />
        </div>
      )}
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: RootState) => {
  return {
    addCardSuccess: state.cartReducer.addCardSuccess,
    removeCardSuccess: state.cartReducer.removeCardSuccess,
    cartId: state.cartReducer.cartId,
    userInfor: state.userInforReducer.userInfor,
    isSetUserInforSuccess: state.userInforReducer.isSetUserInforSuccess,
    addOrderSuccess: state.orderReducer.addOrderSuccess,
    quantityCart: state.cartReducer.quantityCart,
    userRole: state.authReducer.userRole,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSection);
