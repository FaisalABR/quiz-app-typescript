import { AntdLayout } from "@/Layouts/AntdLayout";
import { Form, FormProps, message } from "antd";
import { TalentTypes } from "@/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTalent } from "@/Services/talents";
import { ENDPOINTS } from "@/Constants";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./Form";

export const CreateTalent = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createTalent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
      message.success("Berhasil menambahkan talents");
      navigate(ENDPOINTS.TALENTS.DEFAULT);
    },
  });

  const onFinish: FormProps<TalentTypes>["onFinish"] = (values) => {
    values["id"] = uuidv4();
    values["nama"] = `${values.namaPertama} ${values.namaTerakhir}`;
    mutation.mutate(values);

    form.resetFields();
  };

  return (
    <AntdLayout>
      <FormContainer title="Create Talent" form={form} onFinish={onFinish} />
    </AntdLayout>
  );
};
