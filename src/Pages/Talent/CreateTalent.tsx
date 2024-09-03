import Title from "antd/es/typography/Title";
import { AntdLayout } from "@/Layouts/AntdLayout";
import { storageFirebase } from "@/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import {
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { CreateTalentTypes } from "@/Types";
import { Button } from "@/Components/atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTalent } from "@/Services/talents";
import { SELECT_DIVISI, SELECT_POSISI_CHAINING } from "@/Constants";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useMobile } from "@/Hooks/useMobile";
import { createSchemaFieldRule } from "antd-zod";
import { CreateTalentValidation } from "@/Validation";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { RcFile } from "antd/es/upload";
const { Option } = Select;

const rule = createSchemaFieldRule(CreateTalentValidation);

export const CreateTalent = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectDivisi, setSelectDivisi] = useState("");
  const [fileRefs, setFileRefs] = useState<Map<string, string>>(new Map());
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { isMobile } = useMobile();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createTalent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
      message.success("Berhasil menambahkan talents");
      navigate("/talents");
    },
  });

  const onFinish: FormProps<CreateTalentTypes>["onFinish"] = (values) => {
    mutation.mutate({
      id: uuidv4(),
      nama: `${values.firstName} ${values.lastName}`,
      ...values,
    });

    form.resetFields();
  };

  const props: UploadProps = {
    onRemove: async (file: UploadFile) => {
      try {
        const filePath = fileRefs.get(file.uid);
        if (filePath) {
          const fileRef = ref(storageFirebase, filePath);
          await deleteObject(fileRef);
        }

        setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
        setFileRefs((prev) => {
          const updatedRefs = new Map(prev);
          updatedRefs.delete(file.uid);
          return updatedRefs;
        });
      } catch (e) {
        message.error("Error deleting file");
      }
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
    },
    customRequest: async ({ file, onError, onSuccess, onProgress }) => {
      try {
        const rcFile = file as RcFile;

        const storageRef = ref(storageFirebase, `uploads/${rcFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, rcFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.({ percent: progress });
          },
          (error) => {
            onError?.(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              onSuccess?.(downloadURL);
              form.setFieldsValue({ cv: downloadURL });
              setFileRefs((prev) =>
                new Map(prev).set(rcFile.uid, `uploads/${rcFile.name}`)
              );
            });
          }
        );
      } catch (error) {
        onError?.(error as Error);
      }
    },
    fileList,
  };

  return (
    <AntdLayout>
      <Flex justify="center" align="center" gap="middle" vertical>
        <Title level={2}>Create Talent</Title>

        <Form form={form} onFinish={onFinish}>
          <Flex vertical gap="large">
            <Flex gap="middle" vertical={isMobile ? true : false}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[rule]}
                layout="vertical"
                // style={{width}}
              >
                <Input placeholder="John" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[rule]}
                layout="vertical"
                // style={{width}}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Flex>
            <Flex gap="middle" vertical={isMobile ? true : false}>
              <Form.Item
                name="tanggalLahir"
                label="Tanggal Lahir"
                rules={[rule]}
                layout="vertical"
                style={{ flex: 1 }}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="domisili"
                label="Domisili"
                rules={[rule]}
                layout="vertical"
                style={{ flex: 1 }}
              >
                <Input placeholder="Jakarta" />
              </Form.Item>
            </Flex>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[rule]}
              layout="vertical"
            >
              <Input
                addonBefore={
                  <Form.Item name="prefix" noStyle>
                    <Select defaultValue="62" style={{ width: 70 }}>
                      <Option value="86">+86</Option>
                      <Option value="62">+62</Option>
                      <Option value="87">+87</Option>
                    </Select>
                  </Form.Item>
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[rule]}
              layout="vertical"
            >
              <Input placeholder="johndoe.work@gmail.com" />
            </Form.Item>
            <Divider>Profesional Information</Divider>
            <Form.Item
              name="divisi"
              label="Divisi"
              rules={[rule]}
              layout="vertical"
            >
              <Select
                placeholder="Divisi"
                allowClear
                options={SELECT_DIVISI}
                onChange={(value) => setSelectDivisi(value)}
              />
            </Form.Item>
            <Form.Item
              name="posisi"
              label="Posisi"
              rules={[rule]}
              layout="vertical"
            >
              <Select
                placeholder="Posisi"
                allowClear
                options={
                  selectDivisi
                    ? SELECT_POSISI_CHAINING[selectDivisi]
                    : [
                        {
                          value: "disabled",
                          label: "Tolong pilih divisi terlebih dahulu!",
                          disabled: true,
                        },
                      ]
                }
              />
            </Form.Item>
            <Form.Item
              name="kontrak"
              label="Durasi Kontrak"
              rules={[rule]}
              layout="vertical"
            >
              <InputNumber<number>
                style={{ width: "100%" }}
                addonAfter={
                  <Select defaultValue="tahun" style={{ width: 100 }}>
                    <Option value="tahun">Tahun</Option>
                    <Option value="bulan">Bulan</Option>
                  </Select>
                }
              />
            </Form.Item>
            <Form.Item
              name="salary"
              label="Salary"
              rules={[rule]}
              layout="vertical"
            >
              <InputNumber<number>
                defaultValue={1000000}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value?.replace(/Rp\s?|(,*)/g, "") as unknown as number
                }
              />
            </Form.Item>
            <Form.Item
              name="skills"
              label="Skills"
              rules={[rule]}
              layout="vertical"
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
                options={[
                  { value: "react", label: "React" },
                  { value: "laravel", label: "Laravel" },
                  { value: "vue", label: "Vue" },
                  { value: "nest", label: "Nest" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="bahasa"
              label="Bahasa"
              rules={[rule]}
              layout="vertical"
            >
              <Checkbox.Group
                options={[
                  {
                    value: "indonesia",
                    label: "Bahasa Indonesia",
                  },
                  {
                    value: "english",
                    label: "English",
                  },
                  {
                    value: "japanese",
                    label: "Japanese",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="github"
              label="Github Profile"
              rules={[rule]}
              layout="vertical"
            >
              <Input placeholder="https://github.com/FaisalABR" />
            </Form.Item>
            <Form.Item
              name="linkedin"
              label="Linkedin Profile"
              rules={[rule]}
              layout="vertical"
            >
              <Input placeholder="https://github.com/FaisalABR" />
            </Form.Item>
            <Form.Item
              name="websitePortfolio"
              label="Website Portfolio (Jika ada)"
              layout="vertical"
            >
              <Input placeholder="https://faisalportfolio.com" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[rule]}
              layout="vertical"
            >
              <Select
                placeholder="Status Kesediaan Project"
                allowClear
                options={[
                  { value: "idle", label: "Idle" },
                  { value: "on going", label: "On Going" },
                ]}
                onChange={(value) => setSelectDivisi(value)}
              />
            </Form.Item>
            <Form.Item
              name="isAvailableWFO"
              label="Bersedia WFO"
              rules={[rule]}
              layout="vertical"
            >
              <Switch
                checkedChildren="Bersedia"
                unCheckedChildren="Tidak Bersedia"
                defaultChecked
              />
            </Form.Item>
            <Form.Item name="cv" label="CV" rules={[rule]} layout="vertical">
              <Upload {...props} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Form.Item style={{ marginTop: "2rem" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Flex>
    </AntdLayout>
  );
};
