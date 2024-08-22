import { Link } from "react-router-dom";
import { useQuizContext } from "../../../Hooks/useQuiz";
import { useAuthContext } from "../../../Hooks/useAuth";

export const HomeAction = () => {
  const { resetGame, isResume } = useQuizContext();
  const { isAuth } = useAuthContext();

  return (
    <>
      {isAuth ? (
        <Link
          to="/quiz"
          onClick={() => resetGame()}
          className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
        >
          Play
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
        >
          Login
        </Link>
      )}
      {isResume && isAuth ? (
        <Link
          to="/quiz"
          className="text-blue-950 border border-blue-950 px-3 py-1 rounded-md bg-white font-bold"
        >
          Resume
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};
