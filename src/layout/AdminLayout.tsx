import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer, Header, SideBarAdmin } from "../components";

export const AdminLayout = () => {
  useEffect(() => {
    console.log("ínide effect");
  }, []);
  console.log("outside effect");
  return (
    <div className="relative flex flex-col w-full h-full font-ubuntu min-w-[375px]">
      <Header />
      <div className="w-full h-full flex">
        <SideBarAdmin />
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
