// import { Reducer } from "react";
import { QuizActionType, QuizStateTypes } from "../Types";

export const quizReducer = (
  state: QuizStateTypes,
  action: QuizActionType
): QuizStateTypes => {
  switch (action.type) {
    case "ANSWER_CORRECT":
      return {
        ...state,
        score: state.score + 100,
        countRight: state.countRight + 1,
      };
    case "NEXT_QUESTION": {
      const nextIndex = state.index + 1;
      const isLastQuestion = state.questions.length === nextIndex;
      return {
        ...state,
        index: nextIndex,
        isEnded: isLastQuestion,
      };
    }
    case "PAUSE_GAME":
      return {
        ...state,
        isResume: false,
      };
    case "RESUME_GAME":
      return {
        ...state,
        isResume: true,
      };
    case "LOAD_FROM_STORAGE": {
      const { payload } = action;
      return {
        ...state,
        questions: payload.questions,
        index: payload.index,
        timer: payload.timer,
        isEnded: payload.isEnded,
        score: payload.score,
        countRight: payload.countRight,
      };
    }
    case "RESET_GAME":
      return {
        ...state,
        timer: 15,
        isEnded: false,
        index: 0,
        score: 0,
        countRight: 0,
      };
    case "FETCH_DATA":
      return {
        ...state,
        questions: action.payload,
      };
    case "HANDLE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FINISH_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "COUNTDOWN":
      return {
        ...state,
        timer: state.timer - 1,
      };
    case "ENDGAME":
      return {
        ...state,
        isEnded: true,
      };
    default:
      return state;
  }
};
