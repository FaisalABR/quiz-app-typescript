import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { NAV_ITEMS } from "../../Constants";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {
  ModalUpdate,
  ProductForm,
  ProductTable,
} from "../../Components/organism";

const { Sider, Header } = Layout;

export const Product = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["products-key"]}
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
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title>CRUD Product</Title>
          <ProductForm />
          <ProductTable />
          <ModalUpdate />
        </Content>
      </Layout>
    </Layout>
  );
};
