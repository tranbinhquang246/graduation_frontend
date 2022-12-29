import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../assets";

export const CardItem = (props: any) => {
  const data = props.data;
  const navigate = useNavigate();
  const handleClickItem = () => {
    navigate(`/product/${data?.id}`);
  };
  return (
    <div
      className="relative flex flex-col items-center h-[312px] min-w-[228px] max-w-[300px] bg-slate-100 p-1 m-2 hover:cursor-pointer shadow-2xl rounded-md hover:scale-110 transition duration-300 ease-in-out"
      onClick={handleClickItem}
    >
      <img
        src={IMAGES.logoApp}
        className="w-[15px] h-[15px]"
        alt="logocard"
      ></img>
      <img src={data?.mainImg} alt="main" className="w-full h-2/3 mt-2"></img>
      <p className="font-bold text-sm">{data?.name}</p>
      {data?.salePrice === data?.price ? (
        <div className="h-[20px]" />
      ) : (
        <del className="font-light text-xs h-[20px]">{`${data?.price.toLocaleString(
          "vi-VN"
        )} đ`}</del>
      )}
      <p className="font-bold text-xs h-[20px]">{`${data?.salePrice.toLocaleString(
        "vi-VN"
      )} đ`}</p>
      {data?.quantity === 0 ? (
        <div className="absolute mt-[80px] bg-slate-100 w-full max-w-[228px] text-center p-2">
          <p className="text-red-500 font-bold text-sm">Sold Out</p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
