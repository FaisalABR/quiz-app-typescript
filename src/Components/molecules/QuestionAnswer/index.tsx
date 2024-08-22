import { useQuizContext } from "../../../Hooks/useQuiz";
import Choices from "../../Choices";

export const QuestionAnswer = () => {
  const { index, questions } = useQuizContext();

  return (
    <div className="px-4">
      <h3 className="text-xl font-bold text-blue-950 mb-5">
        {index + 1}. {questions[index].question}
      </h3>
      <Choices />
    </div>
  );
};
