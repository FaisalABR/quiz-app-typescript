import { Button, ConfigProvider, Layout, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { NAV_ITEMS } from "../../Constants";
import { Content, Header } from "antd/es/layout/layout";
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { siderThemeConfig } from "../../Utils/theme";

export const AntdLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [current, setCurrent] = useState<string>(location.pathname);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  useEffect(() => {
    const handleScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleScreen);
    handleScreen();

    return window.removeEventListener("resize", handleScreen);
  }, [window.innerWidth]);

  const handleActiveMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible={true}
        collapsedWidth={isMobile ? "0" : "80"}
        theme="light"
        collapsed={collapsed}
        breakpoint="lg"
        style={{
          backgroundColor: "#00ACC1",
          minHeight: "100vh",
          position: isMobile ? "absolute" : "relative",
          // ! TODO: Bisa pake && tapi ada error
          bottom: isMobile ? 0 : undefined,
          zIndex: isMobile ? 10 : undefined,
          filter: isMobile
            ? "drop-shadow(16px 4px 52px rgba(0, 0, 0, 0.25))"
            : undefined,
        }}
      >
        <div className="demo-logo-vertical" />
        <ConfigProvider theme={siderThemeConfig}>
          {isMobile && (
            <CloseOutlined
              style={{ margin: "10px 28px", color: "white" }}
              onClick={() => setCollapsed(true)}
            />
          )}
          <Menu
            onClick={handleActiveMenu}
            style={{ height: "100%" }}
            theme="light"
            mode="inline"
            selectedKeys={[current]}
            defaultSelectedKeys={["/products"]}
            items={NAV_ITEMS}
          />
        </ConfigProvider>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            overflow: "auto",
            // backgroundColor: "#FF503F",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
