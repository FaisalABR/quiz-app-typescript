import { useAuthContext } from "../../../Hooks/useAuth";

export const HomeHeader = () => {
  const { isAuth } = useAuthContext();

  return (
    <h1 className="text-2xl font-bold">
      Hi, {isAuth ? isAuth.email : "Guest"}
    </h1>
  );
};
