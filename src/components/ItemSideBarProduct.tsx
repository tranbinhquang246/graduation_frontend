import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RadioChangeEvent, Space } from "antd";
import { Radio } from "antd";
import { useSearchParams } from "react-router-dom";
import "./radiobutton.css";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { handleError } from "../service";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const ItemSideBarProduct = (props: {
  param: string;
  title: string;
  init: string;
}) => {
  const [data, setData] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}lookup-data/${props.param}`)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        handleError(error);
      });
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobileScreen(true);
      } else {
        setIsMobileScreen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const itemMenu = data.map((element: any) => {
    return getItem(capitalizeFirstLetter(element.name), element.name);
  });
  itemMenu.unshift(getItem("All", "all"));
  const items: MenuProps["items"] = [
    getItem(props?.title, "item", null, itemMenu),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "all") {
      searchParams.delete(props.param);
      setSearchParams(searchParams);
      return;
    }
    searchParams.set(props.param, e.key);
    setSearchParams(searchParams);
  };

  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="w-full">
      <Menu
        className=""
        defaultSelectedKeys={[props?.init]}
        mode="inline"
        theme="dark"
        // inlineCollapsed={isMobileScreen}
        items={items}
        onClick={onClick}
      />
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSideBarProduct);
