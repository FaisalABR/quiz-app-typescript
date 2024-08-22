import { useContext } from "react";
import { QuizContext } from "../Context/QuizContext";

export const useQuizContext = () => {
  const quiz = useContext(QuizContext);

  if (quiz === undefined) {
    throw new Error("useQuizContext must be used within QuizProvider");
  }

  return quiz;
};
