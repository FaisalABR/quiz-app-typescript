import { useQuizContext } from "../../../Hooks/useQuiz";
import { useAuthContext } from "../../../Hooks/useAuth";
import { Button } from "../../atoms";

export const HomeAction = () => {
  const { resetGame, state } = useQuizContext();
  const { isAuth } = useAuthContext();

  return (
    <>
      {isAuth ? (
        <Button
          text="Play"
          href="/quiz"
          handleClick={() => resetGame()}
          type="primary"
        />
      ) : (
        <Button text="Login" href="/login" type="primary" />
      )}
      {state.isResume && isAuth && <Button text="Resume" href="/quiz" />}
    </>
  );
};
