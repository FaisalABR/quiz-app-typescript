import { useEffect, useState } from "react";
import { useQuizContext } from "../../../Hooks/useQuiz";
import { Button } from "../../atoms";

export const Choices = () => {
  const { state, handleAnswer } = useQuizContext();
  const { index, questions } = state;

  const [answers, setAnswers] = useState([
    ...questions[index].incorrect_answers,
    questions[index].correct_answer,
  ]);

  useEffect(() => {
    setAnswers([
      ...questions[index].incorrect_answers,
      questions[index].correct_answer,
    ]);
  }, [questions, index]);

  return (
    <div className="w-full flex flex-col gap-2 ">
      {answers.map((item, i) => (
        <Button key={i} handleClick={() => handleAnswer(item)} text={item} />
      ))}
    </div>
  );
};
