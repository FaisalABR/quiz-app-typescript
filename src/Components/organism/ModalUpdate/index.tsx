import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Modal,
} from "antd";
import { CreateProductTypes } from "../../../Types";
import { createSchemaFieldRule } from "antd-zod";
import { CreateFormValidation } from "../../../Validation";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, updateProduct } from "../../../Services/products";
import { useEffect, useState } from "react";

const rule = createSchemaFieldRule(CreateFormValidation);

export const ModalUpdate = () => {
  const [openModal, setOpenModal] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["product", productId!],
    queryFn: fetchProduct,
    enabled: !!productId,
  });

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Berhasil mengupdate data");
    },
    onError: () => {
      message.error("Gagal mengupdate data");
    },
  });

  const onFinish: FormProps<CreateProductTypes>["onFinish"] = (values) => {
    mutation.mutate({
      id: productId!,
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    });
  };

  const cancelModal = () => {
    setOpenModal(false);
    navigate("/products");
  };

  useEffect(() => {
    if (productId) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [productId]);

  useEffect(() => {
    if (openModal && data && productId) {
      setOpenModal(true);
      form.setFieldsValue({
        name: data?.name,
        price: data?.price,
        quantity: data?.quantity,
      });
    }
  }, [productId, data, openModal]);
  return (
    <Modal
      forceRender
      open={openModal}
      onCancel={cancelModal}
      footer={[
        <Button key="back" onClick={cancelModal}>
          Return
        </Button>,
        <Button form="updateForm" key="submit" type="primary" htmlType="submit">
          Submit
        </Button>,
      ]}
    >
      <Form
        id="updateForm"
        form={form}
        onFinish={onFinish}
        name="update-products"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "100%" }}
      >
        <Form.Item<CreateProductTypes> label="Name" name="name" rules={[rule]}>
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
      </Form>
    </Modal>
  );
};
