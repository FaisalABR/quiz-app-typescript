import { LoginForm, SignUpForm } from "../../Components/organism";
import { Layout } from "../../Layouts";
import { useAuthContext } from "../../Hooks/useAuth";

export const Login = () => {
  const { openLogin } = useAuthContext();
  return (
    <Layout>
      <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
        <div className="w-[90%] lg:max-w-[1184px] flex items-center justify-center">
          {openLogin ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </Layout>
  );
};
