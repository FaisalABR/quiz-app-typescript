import { Typography } from "antd";

export const AuthUser = ({ email }: { email: string }) => {
  return (
    <Typography.Text style={{ color: "white", fontWeight: 500 }}>
      Hi, {email}
    </Typography.Text>
  );
};
