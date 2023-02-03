import React from "react";
import { connect } from "react-redux";

export const UserPage = () => {
  return <div className="mt-[56px]">UserPage</div>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
