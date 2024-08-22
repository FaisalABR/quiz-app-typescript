import { QuestionProps } from "../../../Types";

export const Question = ({ number, question }: QuestionProps) => {
  return (
    <h3 className="text-xl font-bold text-blue-950 mb-5">
      {number}. {question}
    </h3>
  );
};
