import React from "react";
import { connect } from "react-redux";

export const OrdersPage = () => {
  return <div className="mt-[56px]">OrdersPage</div>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
