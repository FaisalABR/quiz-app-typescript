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
import { PlusSquareOutlined } from "@ant-design/icons";
import { TalentTypes } from "../../Types";
import { formatCurrency } from "../../Utils/utils";
import type { GetProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchTalents } from "../../Services/talents";
import { useEffect, useState } from "react";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export const User = () => {
  const [filter, setFilter] = useState({
    posisi: "",
    divisi: "",
    query: "",
  });
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["talents", filter],
    queryFn: () => fetchTalents(filter),
  });

  const filteredData = data?.filter((item: TalentTypes) =>
    item.nama.toLowerCase().includes(filter.query.toLowerCase())
  );

  useEffect(() => {
    if (isError) {
      message.error("Gagal dalam loading data, mohon hubungi developer!");
    }
  }, [isError]);

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
      render: (__, record) => (
        <Space>
          <Button danger>{record.nama} Delete</Button>
          <Button>Edit</Button>
        </Space>
      ),
    },
  ];

  const handleChangeDivisi = (value: string) => {
    setFilter({
      ...filter,
      divisi: value,
    });
    refetch();
    console.log(`selected ${value}`);
  };

  const handleChangePosisi = (value: string) => {
    setFilter({
      ...filter,
      posisi: value,
    });
    console.log(`selected ${value}`);
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
      <Flex style={{ marginBottom: "2rem" }} gap="middle">
        <Select
          style={{ width: "30%" }}
          onChange={handleChangeDivisi}
          placeholder="Divisi"
          options={[
            { value: "IT Development", label: "IT Development" },
            { value: "Marketing", label: "Marketing" },
            { value: "Finance", label: "Finance" },
            { value: "IT Network", label: "IT Network" },
          ]}
        />
        <Select
          style={{ width: "30%" }}
          onChange={handleChangePosisi}
          placeholder="Posisi"
          options={[
            { value: "Frontend Developer", label: "Frontend" },
            { value: "Backend Developer", label: "Backend" },
            { value: "Mobile Developer", label: "Mobile" },
            { value: "Quality Assurance", label: "Quality Assurance" },
          ]}
        />
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: "40%" }}
        />
      </Flex>

      <Table
        scroll={{ x: true }}
        columns={COLUMNS_NAME}
        loading={isLoading}
        dataSource={filteredData}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
      />
    </AntdLayout>
  );
};
