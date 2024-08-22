import { useQuizContext } from "../../../Hooks/useQuiz";
import { Question } from "../../atoms";
import { Choices } from "../Choices";

export const QuestionAnswer = () => {
  const { index, questions } = useQuizContext();

  return (
    <div className="px-4">
      <Question number={index + 1} question={questions[index].question} />
      <Choices />
    </div>
  );
};
