import { FirebaseError } from "firebase/app";
import { User, UserCredential } from "firebase/auth";
import { ReactNode } from "react";

export interface ChildrenTypes {
  children: ReactNode;
}

export interface QuizTypes {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ButtonProps {
  className: string;
  handleClick: () => void;
  text: string;
}

export interface StatProps {
  className?: string;
  label: string;
  amount: number;
}

export interface GreetingProps {
  text: string;
}

export interface AuthContextType {
  isAuth: User | null;
  setIsAuth: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  signUp: (email: string, password: string) => void;
  signIn: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
  error: FirebaseError | null;
}

export interface QuizContextType {
  index: number;
  questions: QuizTypes[];
  handleAnswer: (answer: string) => void;
  resetGame: () => void;
  score: number;
  countRight: number;
  timer: number;
  setIsEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  isResume: boolean;
  isEnded: boolean;
  fetchQuestions: () => Promise<void>;
  error: FirebaseError | null;
}

export type Action = { type: "NEXT_QUESTION" };
