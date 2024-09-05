import { AntdLayout } from "@/Layouts/AntdLayout";
import { Form, FormProps, message, Result } from "antd";
import { TalentTypes } from "@/Types";
import { Button } from "@/Components/atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTalent, updateTalent } from "@/Services/talents";
import { ENDPOINTS } from "@/Constants";
import { useNavigate, useParams } from "react-router-dom";
import { themeColors } from "@/Utils/theme";
import { FormContainer } from "./Form";

export const UpdateTalent = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { talentId } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["talent", talentId],
    queryFn: () => fetchTalent(talentId!),
    enabled: !!talentId,
  });

  const mutation = useMutation({
    mutationFn: updateTalent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
      message.success("Berhasil memperbaharui talent");
      navigate(ENDPOINTS.TALENTS.DEFAULT);
    },
    onError: () => {
      message.error("Gagal memperbaharui talent");
    },
  });

  const onFinish: FormProps<TalentTypes>["onFinish"] = (values) => {
    values["id"] = data.id;
    values["nama"] = `${values.namaPertama} ${values.namaTerakhir}`;
    mutation.mutate(values);
  };

  return (
    <AntdLayout>
      {isError ? (
        <Result
          status="404"
          title="404"
          subTitle="Maaf talent yang anda cari tidak ada."
          extra={
            <Button
              href={ENDPOINTS.TALENTS.DEFAULT}
              style={{ backgroundColor: themeColors.primary, color: "white" }}
            >
              Kembali ke Halaman Talent
            </Button>
          }
        />
      ) : (
        <FormContainer
          title="Update Talent"
          form={form}
          data={data}
          isLoading={isLoading}
          onFinish={onFinish}
        />
      )}
    </AntdLayout>
  );
};
