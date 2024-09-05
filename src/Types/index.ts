import { ButtonProps, FormInstance, FormProps } from "antd";
import { AxiosRequestConfig } from "axios";
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

export interface IProps extends ButtonProps {
  href?: string;
  handleClick?: () => void;
}

export interface StatProps {
  color?: string;
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

export type FilterProps = {
  divisi: string;
  posisi: string;
  query: string;
  page: number;
};

export interface CallAPIProps extends AxiosRequestConfig {
  endpoint: string;
}

export type FileUploadTypes = {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: {
    uid: string;
  };
};

export interface TalentTypes {
  id: string;
  nama: string;
  key?: string;
  namaPertama: string;
  namaTerakhir: string;
  tanggalLahir: string;
  domisili: string;
  nomorTelepon: string;
  email: string;
  divisi: string;
  posisi: string;
  kontrak: number;
  gaji: number;
  keahlian: string[];
  bahasa: string[];
  github: string;
  linkedin: string;
  websitePortfolio: string;
  status: "idle" | "on going";
  bersediaWFO: boolean;
  cv: string;
  tentangDiri: string;
}

export type TextFormatType =
  | "bold"
  | "italic"
  | "underline"
  | "codeblock"
  | "strikethrough";

export type AlignmentType = "left" | "center" | "right";

export type DivisiType =
  | "IT Development"
  | "Research"
  | "Design"
  | "Sales"
  | "HR"
  | "Marketing";

export type OptionType = { value: string; label: string; disabled?: boolean };

export interface IFormProps {
  title: string;
  form: FormInstance;
  onFinish: FormProps<TalentTypes>["onFinish"];
  data?: TalentTypes;
  isLoading?: boolean;
}
