export const GET_QUESTIONS = "GET_QUESTIONS";
export const SET_USER_ANSWER_ON_QUESTION = "SET_USER_ANSWER_ON_QUESTION";
export const SAVE_NEW_QUESTION = "SAVE_NEW_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

export function setUserAnswerOnQuestion(userId, questionId, answer) {
  return {
    type: SET_USER_ANSWER_ON_QUESTION,
    userId,
    questionId,
    answer
  };
}

export function saveNewQuestion(question) {
  return {
    type: SAVE_NEW_QUESTION,
    question
  };
}
