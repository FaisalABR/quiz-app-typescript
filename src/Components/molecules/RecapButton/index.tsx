import { Link } from "react-router-dom";
import { Button } from "../../atoms";
import { useQuizContext } from "../../../Hooks/useQuiz";

export const RecapButton = () => {
  const { resetGame } = useQuizContext();
  return (
    <div className="flex items-start gap-3 mt-2  3 px-3">
      <Link
        to="/"
        onClick={() => localStorage.removeItem("quizState")}
        className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
      >
        Return to Home
      </Link>
      <Button
        handleClick={resetGame}
        className="bg-white border border-blue-950 px-3 py-1 rounded-md text-blue-950 font-bold"
        text="Retry"
      />
    </div>
  );
};
