import { Typography } from "antd";
import { StatProps } from "../../../Types";

export const Stats = ({ color, label, amount }: StatProps) => {
  return (
    <Typography.Title level={5} style={{ color: color }}>
      {label}: {amount}
    </Typography.Title>
  );
};
