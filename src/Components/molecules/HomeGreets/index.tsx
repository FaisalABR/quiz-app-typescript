import { useAuthContext } from "../../../Hooks/useAuth";
import { Greetings } from "../../atoms";

export const HomeGreets = () => {
  const { isAuth } = useAuthContext();
  return (
    <Greetings
      text={
        isAuth
          ? "Let's Start the quiz"
          : "Before you start the game please login first."
      }
    />
  );
};
