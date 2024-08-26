import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Hooks/useAuth";
import { AccountPrompt } from "../../atoms";
import { Button, Form, FormProps, Input, message } from "antd";
import { AuthLoginTypes } from "../../../Types";
import { createSchemaFieldRule } from "antd-zod";
import { AuthValidation } from "../../../Validation";
import Title from "antd/es/typography/Title";

const rule = createSchemaFieldRule(AuthValidation);

export const LoginForm = () => {
  const { signIn, handleSection } = useAuthContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinisih: FormProps<AuthLoginTypes>["onFinish"] = async (
    values
  ) => {
    try {
      await signIn(values.email, values.password);

      message.success("Login success");

      navigate("/");
    } catch (e) {
      message.error(String(e));
    }

    form.resetFields();
  };

  return (
    <>
      <div className="w-full max-w-[420px] px-4 bg-white rounded-sm shadow-sm py-3">
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form
          form={form}
          name="login"
          onFinish={handleFinisih}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          style={{ width: "100%" }}
          layout="vertical"
        >
          <Form.Item<AuthLoginTypes> label="Email" name="email" rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item<AuthLoginTypes>
            label="Password"
            name="password"
            rules={[rule]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <AccountPrompt
          prompt="Don't have an account?"
          text="Sign Up"
          handleSection={handleSection}
        />
      </div>
    </>
  );
};
