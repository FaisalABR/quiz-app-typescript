import { Button, Layout, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { NAV_ITEMS } from "../../Constants";
import { Header } from "antd/es/layout/layout";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AntdLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>(location.pathname);
  console.log(location.pathname);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const handleActiveMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible={true}
        collapsedWidth="0"
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={handleActiveMenu}
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          defaultSelectedKeys={["/products"]}
          items={NAV_ITEMS}
        />
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
        {children}
      </Layout>
    </Layout>
  );
};
