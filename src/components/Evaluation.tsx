import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

function Evaluation(props: any) {
  return (
    <div className="flex text-xs p-3">
      <div className="flex">
        {props?.data.user.userInfor?.avatar ? (
          <Avatar src={props?.data.user.userInfor?.avatar} size="large" />
        ) : (
          <Avatar icon={<UserOutlined />} size="large" />
        )}
      </div>
      <div className="flex flex-col ml-3">
        <div className="flex font-medium mb-1">
          <p>{props?.data.user.userInfor?.firstName || "No Name"}</p>
          <p>{props?.data.user.userInfor?.lastName}</p>
        </div>
        <p>{props?.data.comment}</p>
      </div>
    </div>
  );
}

export default Evaluation;
