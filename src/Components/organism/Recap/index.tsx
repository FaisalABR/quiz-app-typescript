import { QuizLayout } from "../../../Layouts/QuizLayout";
import { Header, RecapButton, RecapScore } from "../../molecules";

export const Recap = () => {
  return (
    <QuizLayout>
      <Header />
      <RecapScore />
      <RecapButton />
    </QuizLayout>
  );
};
