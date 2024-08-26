import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Space } from "antd";
import { CreateProductTypes } from "../../../Types";
import type { FormProps } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../../Services/products";
import { createSchemaFieldRule } from "antd-zod";
import { CreateFormValidation } from "../../../Validation";

const rule = createSchemaFieldRule(CreateFormValidation);

export const ProductForm = () => {
  const [openForm, setOpenForm] = useState(false);
  const [form] = Form.useForm<CreateProductTypes>();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      messageApi.open({
        type: "success",
        content: "Berhasil menambahkan product",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Gagal menambahkan data",
      });
    },
  });

  const onFinish: FormProps<CreateProductTypes>["onFinish"] = (values) => {
    mutation.mutate({
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    });

    form.resetFields();
  };
  return (
    <>
      {contextHolder}
      <Space style={{ margin: "20px 20" }}>
        <Button
          onClick={() => setOpenForm(!openForm)}
          type="primary"
          icon={<PlusOutlined />}
        >
          Create
        </Button>
      </Space>
      {openForm && (
        <Form
          name="create-products"
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "100%" }}
        >
          <Form.Item<CreateProductTypes>
            label="Name"
            name="name"
            rules={[rule]}
          >
            <Input />
          </Form.Item>
          <Form.Item<CreateProductTypes>
            label="Price"
            name="price"
            rules={[rule]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<CreateProductTypes>
            label="Quantity"
            name="quantity"
            rules={[rule]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 2, span: 12 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
