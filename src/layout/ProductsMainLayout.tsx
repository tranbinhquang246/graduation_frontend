import React from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";

export const ProductsMainLayout = () => {
  return (
    <div className="relative flex flex-col w-full h-full">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMainLayout);
