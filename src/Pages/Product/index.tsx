import { theme } from "antd";

import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {
  ModalUpdate,
  ProductForm,
  ProductTable,
} from "../../Components/organism";
import { AntdLayout } from "../../Layouts/AntdLayout";

export const Product = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntdLayout>
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
    </AntdLayout>
  );
};
