import { Link } from "react-router-dom";
import { useAuthContext } from "../../../Hooks/useAuth";
import { AuthUser, Button } from "../../atoms";

export const NavGroup = () => {
  const { isAuth, logout } = useAuthContext();

  return (
    <>
      {isAuth ? (
        <div className="flex items-center gap-3">
          <AuthUser email={isAuth.email!} />
          <Button
            text="Logout"
            handleClick={logout}
            className="text-blue-950 border border-blue-950 px-3 py-1 rounded-md bg-white font-bold"
          />
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-blue-950 px-3 py-1 rounded-md text-white font-bold"
        >
          Login
        </Link>
      )}
    </>
  );
};
