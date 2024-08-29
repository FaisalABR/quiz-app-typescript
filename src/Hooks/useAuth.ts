import { useContext } from "react";

import { AuthContext } from "@/Context/AuthContext";

export const useAuthContext = () => {
  const auth = useContext(AuthContext);

  if (auth === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return auth;
};
