export const GET_USERS = "GET_USERS";
export const SAVE_QUESTION_ANSWER_ON_USER = "SAVE_QUESTION_ANSWER_ON_USER";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}

export function saveQuestionAnswerOnUser(userId, questionId, answer) {
  return {
    type: SAVE_QUESTION_ANSWER_ON_USER,
    userId,
    questionId,
    answer
  };
}
