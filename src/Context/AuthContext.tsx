import { createContext, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { authFirebase } from "@/firebase";
import { AuthContextType, ChildrenTypes } from "@/Types";
import { FirebaseError } from "firebase/app";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: ChildrenTypes) => {
  const [isAuth, setIsAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(true);
  const [error, setError] = useState<FirebaseError | null>(null);

  const signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      await setPersistence(authFirebase, browserLocalPersistence);
      const res = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      return res;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        throw new Error(e.message);
      }

      throw new Error("unknown error");
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await setPersistence(authFirebase, browserLocalPersistence);
      const res = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      return res;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        throw Error(e.message);
      }
      throw new Error("unknown error");
    }
  };

  const logout = async () => {
    try {
      await signOut(authFirebase);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e);
      }
    }
  };

  const handleSection = () => {
    setOpenLogin(!openLogin);
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
      value={{
        isAuth,
        setIsAuth,
        loading,
        signUp,
        signIn,
        logout,
        error,
        handleSection,
        openLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
