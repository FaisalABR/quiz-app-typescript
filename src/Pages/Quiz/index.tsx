import { useEffect } from "react";
import { useQuizContext } from "../../Hooks/useQuiz";
import { Layout } from "../../Layouts";
import { BoxQuiz, Recap } from "../../Components/organism";

export const Quiz = () => {
  const { fetchQuestions, isEnded } = useQuizContext();

  useEffect(() => {
    // if(localStorage.getItem('q'))
    fetchQuestions();
  }, []);

  return (
    <Layout>
      <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
        <div className="w-[90%] lg:max-w-[1184px] ">
          {isEnded ? <Recap /> : <BoxQuiz />}
        </div>
      </div>
    </Layout>
  );
};
