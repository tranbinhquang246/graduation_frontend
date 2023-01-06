/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
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
import { decodeJwt, handleError } from "../service";
import axiosConfig from "../axiosInterceptor/AxioConfig";
import { UserOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import checkAuthenticated from "../service/checkAuthentication";
import type { MenuProps } from "antd";
import { setCartID } from "../redux/cart/actions";
import { RootState } from "../redux/store";

export const HeaderSection: React.FC<Props> = ({
  cartId,
  setCartID,
  addCardSuccess,
}) => {
  const [dataUser, setDataUser] = useState<any>();
  const navigate = useNavigate();
  const [quantityCart, setQuantityCart] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const decodedJwt = await decodeJwt();
      try {
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}user/${decodedJwt?.id}`
        );
        setDataUser(response);
        setCartID({ cardId: response?.data?.Cart.id });
        setQuantityCart((response?.data?.Cart.cartDetail).length);
      } catch (error) {
        console.log(error);
        handleError(error);
      } finally {
        //   hideLoading();
      }
    };
    const authenticated = checkAuthenticated();
    if (authenticated) {
      fetchData();
      return;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (cartId) {
        try {
          const response = await axiosConfig.get(
            `${process.env.REACT_APP_API_URL}cart-detail/${cartId}`
          );
          console.log(response?.data);
          setQuantityCart((response?.data).length);
        } catch (error) {
          handleError(error);
        }
      }
    };
    fetchData();
  }, [addCardSuccess]);
  const handleClick = async () => {
    await localStorage.removeItem("jwt_token");
    window.location.reload();
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            navigate("/edit");
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
    },
  ];
  return (
    <div className="flex fixed z-10 h-[56px] w-full justify-between bg-slate-800">
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
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover: duration-300"
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
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover: duration-300"
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
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover: duration-300"
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
                : "text-white font-medium text-sm cursor-pointer hover:text-blue-300 hover: duration-300"
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
      {dataUser ? (
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
            {dataUser?.data?.userInfor.avatar ? (
              <Avatar shape="square" size="large" />
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
    cartId: state.cartReducer.cartId,
  };
};

const mapDispatchToProps = { setCartID };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSection);
