import { useState } from "react";
import { LoginForm, SignUpForm } from "../../Components/organism";
import { Layout } from "../../Layouts";

export const Login = () => {
  const [openLogin, setLogin] = useState<boolean>(true);

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
