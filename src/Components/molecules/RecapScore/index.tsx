import { useQuizContext } from "../../../Hooks/useQuiz";
import { Stats } from "../../atoms";

export const RecapScore = () => {
  const { questions, score, countRight } = useQuizContext();
  const countWrong = questions.length - countRight;

  return (
    <div className="px-4 flex flex-col gap-1">
      <h1 className="text-lg">Game Selesai</h1>
      <Stats amount={score} label="Score" />
      <div className="flex items-center gap-3">
        <Stats amount={countRight} label="Right" className="text-green-500" />
        <Stats amount={countWrong} label="Wrong" className="text-red-500" />
      </div>
    </div>
  );
};
