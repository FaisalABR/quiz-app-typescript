import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Hooks/useAuth";
import { AccountPrompt } from "../../atoms";
import { Button, Form, FormProps, Input, message } from "antd";
import { AuthLoginTypes } from "../../../Types";
import { createSchemaFieldRule } from "antd-zod";
import { AuthValidation } from "../../../Validation";
import Title from "antd/es/typography/Title";

const rule = createSchemaFieldRule(AuthValidation);

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp, handleSection } = useAuthContext();
  const [form] = Form.useForm();

  const handleFinisih: FormProps<AuthLoginTypes>["onFinish"] = async (
    values
  ) => {
    try {
      await signUp(values.email, values.password);

      message.success("Sign up success");
      navigate("/");
    } catch (e) {
      message.error((e as Error).message);
    }

    form.resetFields();
  };

  return (
    <div className="w-full max-w-[420px] px-4 bg-white rounded-sm shadow-sm py-3">
      <Title level={2} style={{ textAlign: "center" }}>
        Sign Up
      </Title>
      <Form
        form={form}
        name="sign up"
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <AccountPrompt
        prompt="Already have account?"
        text="Login"
        handleSection={handleSection}
      />
    </div>
  );
};
