import { useEffect } from "react";
import { useQuizContext } from "../../../Hooks/useQuiz";
import { TotalTimer } from "../../atoms";

export const Timer = () => {
  const { state, dispatch } = useQuizContext();

  useEffect(() => {
    if (state.timer === 0) {
      dispatch({ type: "ENDGAME" });
      return;
    }
    const interval = setInterval(() => {
      dispatch({ type: "COUNTDOWN" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timer]);

  return (
    <div className="px-2 py-1 flex items-center gap-3 rounded-sm bg-blue-200">
      <p className="text-lg font-semibold text-blue-500">Time Left</p>
      <TotalTimer total={state.timer} />
    </div>
  );
};
