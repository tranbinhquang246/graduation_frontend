import React from "react";
import { IMAGES } from "../assets";

function OrderedCard(props: any) {
  console.log(props);
  return (
    <div className="flex flex-col bg-slate-100 w-full p-2 m-3">
      <div className="flex justify-end w-full border-b-[1px]">
        <p className="text-sm font-light">{props?.data?.statusOrder}</p>
      </div>
      {props?.data?.orderDetail.map((element: any, index: number) => {
        return (
          <div
            className="w-full flex justify-start items-center hover:cursor-pointer m-2"
            key={index}
          >
            <img
              src={element?.product.mainImg}
              alt="productImg"
              className="w-[80px] h-[80px]"
            />
            <div className="ml-2">
              <p className="font-medium">{element?.product.name}</p>
              <p className="text-[0.6rem]">{`Color: ${element?.product.color}`}</p>
              <p className="text-[0.6rem]">{`Brand: ${element?.product.brand}`}</p>
            </div>
          </div>
        );
      })}
      <div className="w-full p-2">
        <p className="text-xs font-light">
          Address: {props?.data?.deliveryAddress}
        </p>
      </div>
      <div className="flex justify-between w-full p-2">
        <div>
          {props?.data.statusOrder === "waiting" ? (
            <button
              className="border-2 text-sm bg-red-500 text-white px-2 py-1 rounded-md hover:text-slate-300 hover:bg-red-600"
              onClick={() => {
                props?.handleCanelOrder(props?.data?.id);
              }}
            >
              Cancel Order
            </button>
          ) : null}
          {props?.data.statusOrder === "confirmed" ||
          props?.data.statusOrder === "delivery" ? (
            <button
              className="border-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:text-slate-300 hover:bg-blue-600"
              onClick={() => {
                props?.handleReceivedOrder(props?.data?.id);
              }}
            >
              Received
            </button>
          ) : null}
          {props?.data.statusOrder === "delivered" ? (
            <img className="w-6 h-6" src={IMAGES.delivered} alt="delivered" />
          ) : null}
        </div>
        <div className="flex">
          <p className="font-light text-base">Total: </p>
          &nbsp;
          <p className="text-base font-medium">
            {`${props?.data?.totalOrder.toLocaleString("vi-VN")} đ`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderedCard;
