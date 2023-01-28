import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";

export const ordered = () => {
  return <div>ordered</div>;
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ordered);
