import Title from "antd/es/typography/Title";
import { ModalUpdate, ProductForm, ProductTable } from "@/Components/organism";
import { AntdLayout } from "@/Layouts/AntdLayout";

export const Product = () => {
  return (
    <AntdLayout>
      <Title>CRUD Product</Title>
      <ProductForm />
      <ProductTable />
      <ModalUpdate />
    </AntdLayout>
  );
};
