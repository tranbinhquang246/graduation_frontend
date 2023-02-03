import React from "react";
import { connect } from "react-redux";

export const ProductsPage = () => {
  return <div className="mt-[56px]">ProductsPage</div>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
