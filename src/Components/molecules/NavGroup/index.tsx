import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../../Hooks/useAuth";
import { AuthUser, Button } from "../../atoms";

export const NavGroup = () => {
  const { isAuth, logout } = useAuthContext();

  return isAuth ? (
    <div className="flex items-center gap-3">
      <AuthUser email={isAuth.email!} />
      <Button text="Logout" handleClick={logout} icon={<LogoutOutlined />} />
    </div>
  ) : (
    <Button href="/login" text="Login" icon={<LoginOutlined />} />
  );
};
