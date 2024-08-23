import { useQuizContext } from "../../../Hooks/useQuiz";

export const FooterQuiz = () => {
  const { state } = useQuizContext();

  const currentQuestion = state.index + 1;
  const totalQuestion = state.questions.length;

  return (
    <div className="flex px-4 items-center justify-between">
      <p className="text-lg text-blue-950 font-medium">
        <span className="font-bold">{currentQuestion}</span> of{" "}
        <span className="font-bold">{totalQuestion}</span> Question
      </p>
    </div>
  );
};
