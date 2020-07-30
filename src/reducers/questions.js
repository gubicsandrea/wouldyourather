import {
  GET_QUESTIONS,
  SET_USER_ANSWER_ON_QUESTION
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case SET_USER_ANSWER_ON_QUESTION:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([
              action.userId
            ])
          }
        }
      };
    default:
      return state;
  }
}
