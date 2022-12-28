import React from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";

export const MainLayout = () => {
  return (
    <div className="relative flex flex-col w-full h-full font-ubuntu">
      <Header />
      <div className="w-full h-full flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
