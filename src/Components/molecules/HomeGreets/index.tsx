import { useAuthContext } from "../../../Hooks/useAuth";
import { Greetings } from "../../atoms";

export const HomeGreets = () => {
  const { isAuth } = useAuthContext();
  return (
    <>
      {isAuth ? (
        <Greetings text="Let's Start the quiz" />
      ) : (
        <Greetings text="Before you start the game please login first." />
      )}
    </>
  );
};
