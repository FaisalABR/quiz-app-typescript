import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Hooks/useAuth";
import { useState } from "react";

export const LoginForm = () => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn(values.email, values.password);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-full max-w-[420px] px-4 bg-white rounded-sm shadow-sm py-3">
      <h2 className="text-lg font-semibold text-blue-950 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col justify-start gap-3">
          <label className="text-blue-950 ">Email</label>
          <input
            type="text"
            className="px-2 py-1 rounded-lg border-2 border-gray-500"
            placeholder="input your email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col justify-start gap-3">
          <label className="text-blue-950 ">Password</label>
          <input
            type="password"
            className="px-2 py-1 rounded-lg border-2 border-gray-500"
            placeholder="input your password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="px-3 py-1 rounded-xl bg-blue-950 font-bold text-white"
        >
          Log In
        </button>
      </form>
    </div>
  );
};
