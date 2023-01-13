import React from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <Loading3QuartersOutlined
    style={{ fontSize: 32, color: "rgb(30 41 59)" }}
    spin
  />
);

const Loading: React.FC<Props> = ({ loading }) => {
  return (
    <>
      {loading && (
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

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    loading: state.loadingReducer.loading,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
