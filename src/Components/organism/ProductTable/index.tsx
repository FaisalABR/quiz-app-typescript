import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Space, Table, TableProps } from "antd";
import { deleteProduct, fetchProducts } from "../../../Services/products";
import { ProductTypes } from "../../../Types";
import { useNavigate } from "react-router-dom";

export const ProductTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Berhasil menghapus data");
    },
    onError: () => {
      message.error("Gagal menghapus data");
    },
  });

  const formattedData = data?.map((item: ProductTypes) => ({
    ...item,
    key: item.id,
  }));

  const COLUMNS_NAME: TableProps<ProductTypes>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (__, record) => (
        <Space>
          <Button onClick={() => mutation.mutate(record.id)} danger>
            Delete {record.name}
          </Button>
          <Button
            style={{
              backgroundColor: "yellow",
            }}
            onClick={() => {
              navigate(record.id);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      scroll={{ x: true }}
      columns={COLUMNS_NAME}
      dataSource={formattedData}
    />
  );
};
