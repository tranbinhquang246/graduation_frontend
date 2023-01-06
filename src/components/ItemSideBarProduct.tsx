import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RadioChangeEvent, Space } from "antd";
import { Radio } from "antd";
import { useSearchParams } from "react-router-dom";
import "./radiobutton.css";

export const ItemSideBarProduct = (props: {
  param: string;
  title: string;
  init: string;
}) => {
  const [data, setData] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [valueRadio, setValueRadio] = useState(props.init);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}lookup-data/${props.param}`)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {});
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === "all") {
      searchParams.delete(props.param);
      setValueRadio(e.target.value);
      setSearchParams(searchParams);
      return;
    }
    setValueRadio(e.target.value);
    searchParams.set(props.param, e.target.value);
    setSearchParams(searchParams);
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="mb-5">
      <p className="font-medium text-md">{props.title}</p>
      <Radio.Group onChange={onChange} value={valueRadio}>
        <Space direction="vertical">
          <Radio value={"all"} key={0}>
            All
          </Radio>
          {data.map((element: any) => {
            return (
              <Radio value={element.name} key={element.id}>
                {capitalizeFirstLetter(element.name)}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSideBarProduct);
