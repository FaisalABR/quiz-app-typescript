import { Typography } from "antd";
import { GreetingProps } from "../../../Types";

export const Greetings = ({ text }: GreetingProps) => {
  return <Typography.Text>{text}</Typography.Text>;
};
