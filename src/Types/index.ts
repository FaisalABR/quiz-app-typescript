import { FirebaseError } from "firebase/app";
import { User, UserCredential } from "firebase/auth";
import { ChangeEvent, Dispatch, ReactNode } from "react";

// PROPS TYPES
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
  handleClick?: () => void;
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

export interface QuestionProps {
  number: number;
  question: string;
}

export interface TotalTimerProps {
  total: number;
}

export interface AccountPromptProps {
  prompt: string;
  handleSection: () => void;
  text: string;
}

export interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// CONTEXT TYPES
export interface AuthContextType {
  isAuth: User | null;
  setIsAuth: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  error: FirebaseError | null;
  handleSection: () => void;
  openLogin: boolean;
}

export interface QuizContextType {
  state: QuizStateTypes;
  dispatch: Dispatch<QuizActionType>;
  handleAnswer: (answer: string) => void;
  fetchQuestions: () => Promise<void>;
  resetGame: () => void;
}

export interface QuizStateTypes {
  questions: QuizTypes[];
  index: number;
  timer: number;
  isEnded: boolean;
  score: number;
  loading: boolean;
  error: Error | null;
  countRight: number;
  isResume: boolean;
}

// ACTION TYPES

type SavedStateTypes = {
  questions: QuizTypes[];
  index: number;
  timer: number;
  isEnded: boolean;
  score: number;
  countRight: number;
};

export type QuizActionType =
  | { type: "RESET_GAME" }
  | { type: "ANSWER_CORRECT" }
  | { type: "NEXT_QUESTION" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" }
  | {
      type: "LOAD_FROM_STORAGE";
      payload: SavedStateTypes;
    }
  | {
      type: "FETCH_DATA";
      payload: QuizTypes[];
    }
  | {
      type: "HANDLE_ERROR";
      payload: Error;
    }
  | {
      type: "FETCH_LOADING";
    }
  | {
      type: "FINISH_LOADING";
    }
  | {
      type: "COUNTDOWN";
    }
  | {
      type: "ENDGAME";
    };

export type UpdateProductTypes = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type CreateProductTypes = {
  name: string;
  quantity: number;
  price: number;
};

export type ProductTypes = {
  id: string;
  key: string;
  name: string;
  quantity: number;
  price: number;
};

export type AuthLoginTypes = {
  email: string;
  password: string;
};
