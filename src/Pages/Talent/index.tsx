import Title from "antd/es/typography/Title";
import { AntdLayout } from "@/Layouts/AntdLayout";
import {
  message,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
  Input,
  Drawer,
  Flex,
  Modal,
} from "antd";
import { Button } from "@/Components/atoms";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "@/Utils/utils";
import type { GetProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTalent, fetchTalents } from "@/Services/talents";
import { useEffect, useState } from "react";
import { ENDPOINTS, SELECT_DIVISI, SELECT_POSISI } from "@/Constants";
import { useNavigate } from "react-router-dom";
import { useMobile } from "@/Hooks/useMobile";
import { TalentTypes } from "@/Types";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export const Talent = () => {
  const navigate = useNavigate();
  const currentQueryParams = new URLSearchParams();
  const [filter, setFilter] = useState({
    posisi: currentQueryParams.get("posisi") || "",
    divisi: currentQueryParams.get("divisi") || "",
    query: currentQueryParams.get("query") || "",
    page: 1,
  });
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { isMobile } = useMobile();
  const [selectedId, setSelectedId] = useState<string>("");
  const queryClient = useQueryClient();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["talents", filter],
    queryFn: () => fetchTalents(filter),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTalent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
      message.success("Hapus talent berhasil!");
      setOpenDelete(false);
    },
    onError: () => {
      message.error("Hapus talent gagal!");
    },
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
      title: "Gaji",
      dataIndex: "gaji",
      key: "gaji",
      render: (__, { gaji }) => formatCurrency(gaji),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Keahlian",
      dataIndex: "keahlian",
      key: "keahlian",
      render: (__, { keahlian }) => (
        <>
          {keahlian.map((item: string) => {
            let color = "";
            if (item === "react") {
              color = "blue";
            } else {
              color = "volcano";
            }

            return (
              <Tag color={color} key={item}>
                {item}
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
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            handleClick={() => {
              setOpenDelete(true);
              setSelectedId(record.id);
            }}
          >
            {" "}
            Delete
          </Button>
          <Button
            href={ENDPOINTS.TALENTS.EDIT + `/${record.id}`}
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
      <Flex
        align="center"
        justify="space-between"
        style={{
          marginBottom: "2rem",
        }}
      >
        <Title level={2} style={{ marginBottom: 0 }}>
          Talents
        </Title>
        <Button
          type="primary"
          href={ENDPOINTS.TALENTS.CREATE}
          icon={<PlusSquareOutlined />}
          style={{ backgroundColor: "#00ACC1", fontSize: 16 }}
        >
          Create Talent
        </Button>
      </Flex>
      <Flex gap="middle" style={{ marginBottom: "2rem" }}>
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
      </Flex>

      <Table
        columns={COLUMNS_NAME}
        dataSource={filteredData}
        scroll={{ x: true }}
        loading={isLoading}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5,
          onChange: (page) => setFilter({ ...filter, page: page }),
        }}
      />
      <Drawer
        title="Filter Talents"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <Flex
          vertical
          style={{
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
        </Flex>
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
      <Modal
        title="Are you sure want to delete?"
        open={openDelete}
        onCancel={() => {
          setOpenDelete(false);
          setSelectedId("");
        }}
        footer={[
          <Button
            key="cancel"
            handleClick={() => {
              setOpenDelete(false);
              setSelectedId("");
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            handleClick={() => deleteMutation.mutate(selectedId)}
          >
            OK
          </Button>,
        ]}
      ></Modal>
    </AntdLayout>
  );
};
