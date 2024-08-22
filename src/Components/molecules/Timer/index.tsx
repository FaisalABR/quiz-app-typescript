import { useEffect } from "react";
import { useQuizContext } from "../../../Hooks/useQuiz";
import { TotalTimer } from "../../atoms";

export const Timer = () => {
  const { timer, setIsEnded, setTimer } = useQuizContext();

  useEffect(() => {
    if (timer === 0) {
      setIsEnded(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prevTimer: number) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="px-2 py-1 flex items-center gap-3 rounded-sm bg-blue-200">
      <p className="text-lg font-semibold text-blue-500">Time Left</p>
      <TotalTimer total={timer} />
    </div>
  );
};
