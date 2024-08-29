import Title from "antd/es/typography/Title";
import { AntdLayout } from "../../Layouts/AntdLayout";
import {
  message,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
  Input,
  Drawer,
} from "antd";
import { Button } from "../../Components/atoms";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
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
import { useMobile } from "../../Hooks/useMobile";

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
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { isMobile } = useMobile();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["talents", filter],
    queryFn: () => fetchTalents(filter),
  });

  // Filtered data base on search query
  const filteredData = data
    ?.map((item: TalentTypes) => ({
      ...item,
      key: item.id,
    }))
    .filter((item: TalentTypes) =>
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
          <Button type="primary" icon={<DeleteOutlined />} danger>
            {" "}
            Delete
          </Button>
          <Button
            style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
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
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {isMobile ? (
          <Button
            icon={<FilterOutlined />}
            handleClick={() => setOpenDrawer(true)}
          />
        ) : (
          <>
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
          </>
        )}
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: isMobile ? "90%" : "50%" }}
        />
      </div>

      <Table
        columns={COLUMNS_NAME}
        dataSource={filteredData}
        scroll={{ x: true }}
        loading={isLoading}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5,
          onChange: (page, pageSize) => setFilter({ ...filter, page: page }),
        }}
      />
      <Drawer
        title="Filter Talents"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <Title level={5}>Divisi</Title>
          <Select
            style={{ width: "100%" }}
            onChange={(value) => handleSelectChange("divisi", value ?? "")}
            placeholder="Divisi"
            allowClear
            options={SELECT_DIVISI}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Title level={5}>Posisi</Title>
          <Select
            style={{ width: "100%" }}
            onChange={(value) => handleSelectChange("posisi", value ?? "")}
            placeholder="Posisi"
            allowClear
            options={SELECT_POSISI}
          />
        </div>
      </Drawer>
    </AntdLayout>
  );
};
