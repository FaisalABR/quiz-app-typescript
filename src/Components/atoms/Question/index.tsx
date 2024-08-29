import { Typography } from "antd";
import { QuestionProps } from "../../../Types";

export const Question = ({ number, question }: QuestionProps) => {
  return (
    <Typography.Title level={3} style={{ color: "#172554" }}>
      {number}. {question}
    </Typography.Title>
  );
};
