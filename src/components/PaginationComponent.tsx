import React from "react";
import { connect } from "react-redux";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";

const PaginationComponent = (props: {
  totalPage: number;
  currentPage: number;
}) => {
  const { totalPage, currentPage } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChangePaginations = (page: any) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };
  if (totalPage !== undefined && currentPage !== undefined) {
    return (
      <Pagination
        defaultCurrent={currentPage}
        total={totalPage * 10}
        onChange={handleChangePaginations}
      />
    );
  }
  return <></>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationComponent);
