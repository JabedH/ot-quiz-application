import {
  QUIZ_START,
  QUIZ_NEXT,
  QUIZ_SUBMIT,
  QUIZ_RESET,
  QUIZ_PREV,
  QUIZ_TIMEOUT,
} from "./actionsTypes";

export const startQuiz = (time)=>{
    return {
        type: QUIZ_START,
        payload: time
    }
}