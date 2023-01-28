import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";

export const EvaluationProduct = () => {
  return <div>EvaluationProduct</div>;
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationProduct);
