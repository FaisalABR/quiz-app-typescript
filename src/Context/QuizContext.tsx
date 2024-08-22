import { createContext, useEffect, useState } from "react";
import { QUESTION_QUIZ } from "../Constants";
import { ChildrenTypes, QuizContextType, QuizTypes } from "../Types";
import { FirebaseError } from "firebase/app";

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

const QuizProvider = ({ children }: ChildrenTypes) => {
  const [questions, setQuestions] = useState<QuizTypes[]>(QUESTION_QUIZ);
  const [index, setIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(15);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<FirebaseError | null>(null);
  const [countRight, setCountRight] = useState<number>(0);
  const [isResume, setIsResume] = useState<boolean>(false);

  const saveQuizState = () => {
    const quizState = {
      questions,
      index,
      timer,
      isEnded,
      score,
      countRight,
    };
    localStorage.setItem("quizState", JSON.stringify(quizState));
  };

  const getSavedQuizState = () => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      setIsResume(true);
      return JSON.parse(savedState);
    } else {
      setIsResume(false);
      return null;
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:3000/questions");
      const data = await res.json();

      setQuestions(data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error);
      }
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer === questions[index].correct_answer) {
      setScore((prevState) => prevState + 100);
      setCountRight((prevState) => prevState + 1);
    }

    const nextIndex = index + 1;
    const isLastQuestion = questions.length === nextIndex;

    if (isLastQuestion) {
      setIsEnded(true);
    } else {
      setIndex(nextIndex);
    }
  };

  const resetGame = () => {
    setTimer(15);
    setIsEnded(false);
    setIndex(0);
    setScore(0);
    setCountRight(0);
    localStorage.removeItem("quizState");
  };

  useEffect(() => {
    // Coba muat status kuis dari localStorage saat provider di-mount
    const savedState = getSavedQuizState();
    if (savedState) {
      setQuestions(savedState.questions);
      setIndex(savedState.index);
      setTimer(savedState.timer);
      setIsEnded(savedState.isEnded);
      setScore(savedState.score);
      setCountRight(savedState.countRight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", saveQuizState);
    // Check again if resume will get bug
  }, [questions, index, timer, isEnded, score, countRight]);

  return (
    <QuizContext.Provider
      value={{
        index,
        questions,
        handleAnswer,
        resetGame,
        score,
        countRight,
        timer,
        setIsEnded,
        setTimer,
        isResume,
        isEnded,
        fetchQuestions,
        error,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
