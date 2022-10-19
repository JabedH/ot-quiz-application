import {
  QUIZ_START,
  QUIZ_NEXT,
  QUIZ_SUBMIT,
  QUIZ_RESET,
  QUIZ_PREV,
  QUIZ_TIMEOUT,
} from "./actionsTypes";

export const startQuiz = (time) => {
  return {
    type: QUIZ_START,
    payload: time,
  };
};
export const nextQuiz = (answers) => {
  return {
    type: QUIZ_NEXT,
    payload: answers,
  };
};
export const prevQuiz = () => {
  return {
    type: QUIZ_PREV,
    payload: null,
  };
};
export const submitQuiz = (answers, time) => {
  return {
    type: QUIZ_START,
    payload: {
      answers: answers,
      time: time,
    },
  };
};
export const resetQuiz = () => {
  return {
    type: QUIZ_RESET,
    payload: null,
  };
};
export const timeOut = () => {
  return {
    type: QUIZ_TIMEOUT,
    payload: null,
  };
};
