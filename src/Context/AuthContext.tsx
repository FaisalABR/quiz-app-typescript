import { createContext, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { authFirebase } from "../firebase";
import { AuthContextType, ChildrenTypes } from "../Types";
import { FirebaseError } from "firebase/app";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: ChildrenTypes) => {
  const [isAuth, setIsAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirebaseError | null>(null);

  const signUp = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      console.log(res);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await setPersistence(authFirebase, browserLocalPersistence);
      console.log("set persistence");
      const res = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      return res;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        setError(e);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(authFirebase);
      console.log("Sign out success");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e);
      }
    }
  };

  useEffect(() => {
    const unsubscrice = onAuthStateChanged(
      authFirebase,
      (user: User | null) => {
        if (user) {
          setIsAuth(user);
        } else {
          setIsAuth(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscrice();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, loading, signUp, signIn, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
