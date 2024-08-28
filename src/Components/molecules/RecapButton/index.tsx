import { Button } from "../../atoms";
import { useQuizContext } from "../../../Hooks/useQuiz";

export const RecapButton = () => {
  const { resetGame } = useQuizContext();
  return (
    <div className="flex items-start gap-3 mt-2  3 px-3">
      <Button
        text="Return to Home"
        href="/"
        onClick={() => localStorage.removeItem("quizState")}
        type="primary"
      />

      <Button handleClick={resetGame} text="Retry" />
    </div>
  );
};
