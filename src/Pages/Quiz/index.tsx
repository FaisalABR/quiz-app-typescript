import { useEffect } from "react";
import { useQuizContext } from "../../Hooks/useQuiz";
import { Layout } from "../../Layouts";
import { BoxQuiz, Recap } from "../../Components/organism";
import { Loading } from "../../Components/atoms";
import { Link } from "react-router-dom";

export const Quiz = () => {
  const { fetchQuestions, state } = useQuizContext();

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (state.error) {
    return (
      <Layout>
        <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
          <div className="w-[90%] lg:max-w-[1184px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-10 px-10 py-12 bg-white rounded-md">
              <h1 className="text-3xl font-bold text-red-500">
                Something Wrong when load your quiz, please try again
              </h1>
              <Link
                to="/"
                className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
        <div className="w-[90%] lg:max-w-[1184px] ">
          {state.loading ? (
            <Loading />
          ) : state.isEnded ? (
            <Recap />
          ) : (
            <BoxQuiz />
          )}
        </div>
      </div>
    </Layout>
  );
};
