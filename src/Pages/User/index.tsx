import Title from "antd/es/typography/Title";
import { AntdLayout } from "../../Layouts/AntdLayout";
import {
  Flex,
  message,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
  Input,
} from "antd";
import { Button } from "../../Components/atoms";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { TalentTypes } from "../../Types";
import { formatCurrency } from "../../Utils/utils";
import type { GetProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchTalents } from "../../Services/talents";
import { useEffect, useState } from "react";
import { SELECT_DIVISI, SELECT_POSISI } from "../../Constants";
import { useNavigate } from "react-router-dom";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export const User = () => {
  const navigate = useNavigate();
  const currentQueryParams = new URLSearchParams();
  const [filter, setFilter] = useState({
    posisi: currentQueryParams.get("posisi") || "",
    divisi: currentQueryParams.get("divisi") || "",
    query: currentQueryParams.get("query") || "",
    page: 1,
  });
  const { isLoading, data, isError } = useQuery({
    queryKey: ["talents", filter],
    queryFn: () => fetchTalents(filter),
  });

  console.log(filter);

  // Filtered data base on search query
  const filteredData = data?.filter((item: TalentTypes) =>
    item.nama.toLowerCase().includes(filter.query.toLowerCase())
  );

  // Handling Error
  useEffect(() => {
    if (isError) {
      message.error("Gagal dalam loading data, mohon hubungi developer!");
    }
  }, [isError]);

  // Handling UrlSearchParams
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filter.posisi) queryParams.set("posisi", filter.posisi);
    if (filter.divisi) queryParams.set("divisi", filter.divisi);
    if (filter.query) queryParams.set("query", filter.query);
    if (filter.page) queryParams.set("page", String(filter.page));

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  }, [filter, navigate, location.pathname]);

  const COLUMNS_NAME: TableProps<TalentTypes>["columns"] = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
    },
    {
      title: "Posisi",
      dataIndex: "posisi",
      key: "posisi",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (__, { salary }) => formatCurrency(salary),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Skills",
      dataIndex: "skill",
      key: "skill",
      render: (__, { skills }) => (
        <>
          {skills.map((skill: string) => {
            let color = "";
            if (skill === "react") {
              color = "blue";
            } else {
              color = "volcano";
            }

            return (
              <Tag color={color} key={skill}>
                {skill}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          <Button icon={<DeleteOutlined />} danger>
            {" "}
            Delete
          </Button>
          <Button icon={<EditOutlined />}>Edit</Button>
        </Space>
      ),
    },
  ];

  const handleSelectChange = (key: string, value: string) => {
    setFilter({
      ...filter,
      [key]: value ?? "",
    });
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    setFilter({
      ...filter,
      query: value,
    });
  };

  return (
    <AntdLayout>
      <Flex
        align="center"
        justify="space-between"
        style={{ marginBottom: "2rem" }}
      >
        <Title level={2} style={{ marginBottom: 0 }}>
          Talents
        </Title>
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          style={{ backgroundColor: "#00ACC1", fontSize: 16 }}
        >
          Create Talent
        </Button>
      </Flex>
      <Flex style={{ marginBottom: "2rem" }} gap="small">
        <Select
          style={{ width: "25%" }}
          onChange={(value) => handleSelectChange("divisi", value ?? "")}
          placeholder="Divisi"
          allowClear
          options={SELECT_DIVISI}
        />
        <Select
          style={{ width: "25%" }}
          onChange={(value) => handleSelectChange("posisi", value ?? "")}
          placeholder="Posisi"
          allowClear
          options={SELECT_POSISI}
        />
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: "50%" }}
        />
      </Flex>

      <Table
        columns={COLUMNS_NAME}
        dataSource={filteredData}
        scroll={{ x: true }}
        loading={isLoading}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5,
          onChange: (event, value) => setFilter({ ...filter, page: value }),
        }}
      />
    </AntdLayout>
  );
};
