import { useQuizContext } from "../../../Hooks/useQuiz";
import { Stats } from "../../atoms";

export const RecapScore = () => {
  const { state } = useQuizContext();
  const countWrong = state.questions.length - state.countRight;

  return (
    <div className="px-4 flex flex-col gap-1">
      <h1 className="text-lg">Game Selesai</h1>
      <Stats amount={state.score} label="Score" />
      <div className="flex items-center gap-3">
        <Stats
          amount={state.countRight}
          label="Right"
          className="text-green-500"
        />
        <Stats amount={countWrong} label="Wrong" className="text-red-500" />
      </div>
    </div>
  );
};
