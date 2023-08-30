import React, { useState, useContext } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { AppContext } from "contexts/app.context";
import { checkIsAuth } from "helpers/auth.helper";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const authenMenu = [
  { key: 1, label: "Home", path: "/" },
  { key: 2, label: "Dashboard", path: "/dashboard" },
  { key: 3, label: "Profile", path: "/profile" },
  { key: 4, label: "Logout", path: "/logout" },
];
const notAuthenMenu = [
  { key: 5, label: "Home", path: "/" },
  { key: 6, label: "Dashboard", path: "/dashboard" },
  { key: 7, label: "Login", path: "/login" },
  { key: 8, label: "Register", path: "/register" },
];

function getItem(label, key, icon, children) {
  console.warn("getItem");
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  { key: 0, label: "Home", path: "/", logo: <PieChartOutlined /> },
  { key: 1, label: "Dashboard", path: "/dashboard", logo: <DesktopOutlined /> },
  { key: 2, label: "Profile", path: "/profile", logo: <UserOutlined /> },
  { key: 3, label: "Login", path: "/login", logo: <TeamOutlined /> },
  { key: 4, label: "Logout", path: "/logout", logo: <FileOutlined /> },
  { key: 5, label: "Register", path: "/register", logo: <FileOutlined /> },
];

const App = () => {
  const { loading } = useContext(AppContext);
  const isAuth = checkIsAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleDisplayMenu = () => {
    let result;
    if (isAuth) {
      result = items.filter(
        (item) => item.label !== "Login" && item.label !== "Register"
      );
    } else {
      result = items.filter(
        (item) => item.label !== "Logout" && item.label !== "Profile"
      );
    }
    return result.map((item) => getItem(item.label, item.key, item.logo));
  };
  const handleOnClick = (selected) => {
    const result = items.find((item) => item.key === parseInt(selected.key));
    navigate(result.path);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          mode="inline"
          items={handleDisplayMenu()}
          onClick={handleOnClick}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
          <><Outlet /></>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
