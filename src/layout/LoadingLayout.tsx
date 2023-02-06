import React from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <Loading3QuartersOutlined
    style={{ fontSize: 32, color: "rgb(30 41 59)" }}
    spin
  />
);

const LoadingLayout = (props: any) => {
  return (
    <>
      {props?.loading && (
        <div className="fixed left-0 top-0 w-screen h-screen bg-[#00000080] flex items-center justify-center z-[1301]">
          <div className="w-[100px] h-[100px] flex flex-col items-center">
            <Spin
              indicator={antIcon}
              tip="Loading"
              className="text-slate-800"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingLayout;
