import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { Tabs } from "antd";
import "./index.css";
import EvaluationTab from "./EvaluationTab";

const ShippingPoilicyTab = () => {
  return (
    <div className="text-sm px-5 font">
      <ul>
        <li>Free shipping under 10km</li>
        <li>
          Available shipping units: VnPost, NinjaVan, GHTK, GHN, ViettelPost
        </li>
        <li>All goods are packed in shockproof and safe protection</li>
      </ul>
    </div>
  );
};
const ReturnPoilicyTab = () => {
  return (
    <div className="text-sm px-5">
      <ul>
        <li>
          Refund and give free similar products if the goods are defective, poor
          quality
        </li>
        <li>Refund up to 3 days</li>
        <li>1 for 1 within 7 days</li>
        <li>After 7 days, surcharge of 30% of the product value</li>
        <li>After 21 days, surcharge of 50% of the product value</li>
        <li>After, 32 days free of return</li>
      </ul>
    </div>
  );
};

const EvaluationProduct = (props: {
  productId: string;
  isAuthenticated: boolean;
  setAddEvaluationSuccess: any;
}) => {
  return (
    <div className="p-5">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: `Evaluations`,
            children: (
              <EvaluationTab
                productId={props?.productId}
                isAuthenticated={props?.isAuthenticated}
                setAddEvaluationSuccess={props?.setAddEvaluationSuccess}
              />
            ),
          },
          {
            key: "2",
            label: `Shipping policy`,
            children: <ShippingPoilicyTab />,
          },
          {
            key: "3",
            label: `Return policy`,
            children: <ReturnPoilicyTab />,
          },
        ]}
        size="large"
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationProduct);
