import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ItemSideBarProduct from "./ItemSideBarProduct";
import { useSearchParams } from "react-router-dom";

const SideBarProduct = () => {
  let [searchParams] = useSearchParams();
  const [initType] = useState(searchParams.get("type") || "all");
  const [initDesign] = useState(searchParams.get("design") || "all");
  const [initMaterial] = useState(searchParams.get("material") || "all");
  const [initBrand] = useState(searchParams.get("brand") || "all");
  const [initColor] = useState(searchParams.get("color") || "all");

  return (
    <div className="flex flex-col border-r-2 h-full bg-[#001529]">
      <ItemSideBarProduct param={"type"} title={"Type"} init={initType} />
      <ItemSideBarProduct param={"design"} title={"Design"} init={initDesign} />
      <ItemSideBarProduct
        param={"material"}
        title={"Material"}
        init={initMaterial}
      />
      <ItemSideBarProduct param={"brand"} title={"Brand"} init={initBrand} />
      <ItemSideBarProduct param={"color"} title={"Color"} init={initColor} />
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarProduct);
