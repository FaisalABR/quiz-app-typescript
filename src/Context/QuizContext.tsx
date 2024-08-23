import { createContext, useEffect, useReducer } from "react";
import { QUESTION_QUIZ, TOTAL_TIMER } from "../Constants";
import { ChildrenTypes, QuizContextType, QuizStateTypes } from "../Types";
import { quizReducer } from "./quizReducer";

const initialState: QuizStateTypes = {
  questions: QUESTION_QUIZ,
  index: 0,
  timer: TOTAL_TIMER,
  isEnded: false,
  score: 0,
  loading: false,
  error: null,
  countRight: 0,
  isResume: false,
};

export const QuizContext = createContext<QuizContextType | null>(null);

const QuizProvider = ({ children }: ChildrenTypes) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, index, timer, isEnded, score, countRight } = state;

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
      dispatch({ type: "RESUME_GAME" });
      return JSON.parse(savedState);
    } else {
      dispatch({ type: "PAUSE_GAME" });
      return null;
    }
  };

  const fetchQuestions = async () => {
    dispatch({ type: "FETCH_LOADING" });
    try {
      const res = await fetch("http://localhost:3000/questions");
      const data = await res.json();
      dispatch({ type: "FETCH_DATA", payload: data });
    } catch (e) {
      if (e instanceof Error) {
        dispatch({ type: "HANDLE_ERROR", payload: e });
      }
    }
    dispatch({ type: "FINISH_LOADING" });
  };

  const handleAnswer = (answer: string) => {
    if (answer === state.questions[state.index].correct_answer) {
      dispatch({ type: "ANSWER_CORRECT" });
    }

    dispatch({ type: "NEXT_QUESTION" });
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
    localStorage.removeItem("quizState");
  };

  useEffect(() => {
    // Coba muat status kuis dari localStorage saat provider di-mount
    const savedState = getSavedQuizState();
    if (savedState) {
      dispatch({
        type: "LOAD_FROM_STORAGE",
        payload: {
          questions: savedState.questions,
          index: savedState.index,
          timer: savedState.timer,
          isEnded: savedState.isEnded,
          score: savedState.score,
          countRight: savedState.countRight,
        },
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", saveQuizState);
  }, [questions, index, timer, isEnded, score, countRight]);

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
        fetchQuestions,
        handleAnswer,
        resetGame,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// const QuizProvider = ({ children }: ChildrenTypes) => {
//   const [state, dispatch] = useReducer(quizReducer, initialState);

//   const [questions, setQuestions] = useState<QuizTypes[]>(QUESTION_QUIZ);
//   const [index, setIndex] = useState<number>(0);
//   const [timer, setTimer] = useState<number>(15);
//   const [isEnded, setIsEnded] = useState<boolean>(false);
//   const [score, setScore] = useState<number>(0);
//   const [error, setError] = useState<FirebaseError | null>(null);
//   const [countRight, setCountRight] = useState<number>(0);
//   const [isResume, setIsResume] = useState<boolean>(false);

//   const saveQuizState = () => {
//     const quizState = {
//       questions,
//       index,
//       timer,
//       isEnded,
//       score,
//       countRight,
//     };
//     localStorage.setItem("quizState", JSON.stringify(quizState));
//   };

//   const getSavedQuizState = () => {
//     const savedState = localStorage.getItem("quizState");
//     if (savedState) {
//       setIsResume(true);
//       return JSON.parse(savedState);
//     } else {
//       setIsResume(false);
//       return null;
//     }
//   };

//   const fetchQuestions = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/questions");
//       const data = await res.json();

//       setQuestions(data);
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         setError(error);
//       }
//     }
//   };

//   const handleAnswer = (answer: string) => {
//     if (answer === questions[index].correct_answer) {
//       setScore((prevState) => prevState + 100);
//       setCountRight((prevState) => prevState + 1);
//     }

//     const nextIndex = index + 1;
//     const isLastQuestion = questions.length === nextIndex;

//     if (isLastQuestion) {
//       setIsEnded(true);
//     } else {
//       setIndex(nextIndex);
//     }
//   };

//   const resetGame = () => {
//     dispatch(resetGameAction());
//     localStorage.removeItem("quizState");
//   };

//   useEffect(() => {
//     // Coba muat status kuis dari localStorage saat provider di-mount
//     const savedState = getSavedQuizState();
//     if (savedState) {
//       setQuestions(savedState.questions);
//       setIndex(savedState.index);
//       setTimer(savedState.timer);
//       setIsEnded(savedState.isEnded);
//       setScore(savedState.score);
//       setCountRight(savedState.countRight);
//     }
//   }, []);

//   useEffect(() => {
//     window.addEventListener("beforeunload", saveQuizState);
//     // Check again if resume will get bug
//   }, [questions, index, timer, isEnded, score, countRight]);

//   return (
//     <QuizContext.Provider
//       value={{
//         index,
//         questions,
//         handleAnswer,
//         resetGame,
//         score,
//         countRight,
//         timer,
//         setIsEnded,
//         setTimer,
//         isResume,
//         isEnded,
//         fetchQuestions,
//         error,
//       }}
//     >
//       {children}
//     </QuizContext.Provider>
//   );
// };

export default QuizProvider;
