import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Hooks/useAuth";
import { ChangeEvent, useState } from "react";
import { AccountPrompt, AuthTitle, Button, Input, Label } from "../../atoms";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const { signIn, handleSection } = useAuthContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(values.email, values.password);

      toast.success("Login success", {
        position: "top-right",
        theme: "light",
      });
      navigate("/");
    } catch (e) {
      toast.error((e as Error).message, {
        position: "top-right",
        theme: "light",
      });
    }

    setValues({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full max-w-[420px] px-4 bg-white rounded-sm shadow-sm py-3">
      <AuthTitle text="Login" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col justify-start gap-3">
          <Label text="Email" />
          <Input
            type="email"
            placeholder="input your email"
            value={values.email}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col justify-start gap-3">
          <Label text="Password" />
          <Input
            type="password"
            placeholder="input your password"
            value={values.password}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, password: e.target.value })
            }
          />
        </div>
        <Button
          className="px-3 py-1 rounded-xl bg-blue-950 font-bold text-white"
          text="Log In"
        />
      </form>

      <AccountPrompt
        prompt="Don't have an account?"
        text="Sign Up"
        handleSection={handleSection}
      />
    </div>
  );
};
