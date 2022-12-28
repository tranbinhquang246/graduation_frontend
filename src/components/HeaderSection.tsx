import React from "react";
import { connect } from "react-redux";
import { IMAGES } from "../assets";
import { NavLink } from "react-router-dom";
import { Avatar, Badge } from "antd";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { SiAboutdotme } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";

export const HeaderSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-[56px] justify-between bg-slate-200">
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
                ? "flex items-center h-full text-blue-600 text-xs text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-600"
                : "text-[#494c4f] font-medium text-xs cursor-pointer hover:text-blue-600 hover: duration-300"
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
                ? "flex items-center h-full text-blue-600 text-xs text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-600"
                : "text-[#494c4f] font-medium text-xs cursor-pointer hover:text-blue-600 hover: duration-300"
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
                ? "flex items-center h-full text-blue-600 text-xs text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-600"
                : "text-[#494c4f] font-medium text-xs cursor-pointer hover:text-blue-600 hover: duration-300"
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
                ? "flex items-center h-full text-blue-600 text-xs text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-600"
                : "text-[#494c4f] font-medium text-xs cursor-pointer hover:text-blue-600 hover: duration-300"
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
                ? "flex items-center h-full text-blue-600 text-xs text-center font-medium hover:cursor-not-allowed border-b-[2px] border-b-blue-600"
                : "text-[#494c4f] font-medium text-xs cursor-pointer hover:text-blue-600 hover:duration-300"
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
      <div className="flex mr-3 items-center justify-center">
        <Badge
          count={5}
          color="#52c41a"
          overflowCount={10}
          size="small"
          className="mr-5"
        >
          <BsFillCartFill
            style={{ width: 22, height: 22 }}
            className="hover:cursor-pointer"
            onClick={() => {
              navigate("/cart");
            }}
          />
        </Badge>

        <Avatar shape="square" size="large" />
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSection);
