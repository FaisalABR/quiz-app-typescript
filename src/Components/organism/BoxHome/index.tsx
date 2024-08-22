import { Link } from "react-router-dom";
import { useAuthContext } from "../../../Hooks/useAuth";
import { useQuizContext } from "../../../Hooks/useQuiz";
import { Greetings } from "../../atoms";

export const BoxHome = () => {
  const { isAuth } = useAuthContext();
  const { resetGame, isResume } = useQuizContext();
  return (
    <div className="w-full max-w-[420px] px-4 bg-white rounded-sm shadow-sm py-3 flex flex-col items-center gap-4">
      {/* Home Header */}
      <h1 className="text-2xl font-bold">
        Hi, {isAuth ? isAuth.email : "Guest"}
      </h1>
      {isAuth ? (
        <Greetings text="Let's Start the quiz" />
      ) : (
        <Greetings text="Before you start the game please login first." />
      )}
      {/* Home Action */}
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
      {/* Home Action */}
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
    </div>
  );
};
