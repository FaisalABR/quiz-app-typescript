import { QuizLayout } from "../../../Layouts/QuizLayout";
import { Header, QuestionAnswer } from "../../molecules";
import { FooterQuiz } from "../../molecules/FooterQuiz";

export const BoxQuiz = () => {
  return (
    <QuizLayout>
      <Header />
      <QuestionAnswer />
      <hr className="w-full  border border-slate-500/40 my-5" />
      <FooterQuiz />
    </QuizLayout>
  );
};
