import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/sidebarAdmin.css";

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

const items: MenuItem[] = [
  getItem("User", "/admin", <PieChartOutlined />),
  getItem("Products", "/admin/products", <PieChartOutlined />),
  getItem("Orders", "/admin/orders", <DesktopOutlined />),
  getItem("Lookup Data", "/admin/lookup-data", <ContainerOutlined />),
  getItem("Collection Users", "/admin/collection-users", <ContainerOutlined />),
  getItem("Banners", "/admin/banner", <ContainerOutlined />),
];

const SidebarAdmin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

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

  const onClick = (info: any) => {
    navigate(info.key);
  };

  return (
    <div className="">
      <Menu
        className="h-full min-h-screen"
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={isMobileScreen}
        items={items}
        onClick={onClick}
      />
    </div>
  );
};

export default SidebarAdmin;
