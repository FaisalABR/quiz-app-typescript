import { useQuizContext } from "../../../Hooks/useQuiz";
import { Question } from "../../atoms";
import { Choices } from "../Choices";

export const QuestionAnswer = () => {
  const { state } = useQuizContext();
  const currentNumber = state.index + 1;
  const currentQuestion = state.questions[state.index].question;

  return (
    <div className="px-4">
      <Question number={currentNumber} question={currentQuestion} />
      <Choices />
    </div>
  );
};
