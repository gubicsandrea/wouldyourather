import { getUsers, saveQuestionAnswerOnUser } from "./users";
import { getQuestions, setUserAnswerOnQuestion } from "./questions";
import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleSaveQuestionAnswer({ userId, questionId, answer }) {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestionAnswer({
      authedUser: userId,
      qid: questionId,
      answer
    })
      .then(() => {
        dispatch(saveQuestionAnswerOnUser(userId, questionId, answer));
        dispatch(setUserAnswerOnQuestion(userId, questionId, answer));
        dispatch(hideLoading());
      })
      .catch(() => {
        alert("Unexpected error, please try again");
        dispatch(hideLoading());
      });
  };
}
