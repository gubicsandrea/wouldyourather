import {
  GET_USERS,
  SAVE_QUESTION_ANSWER_ON_USER,
  ADD_QUESTION
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      };
    case SAVE_QUESTION_ANSWER_ON_USER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.questionId]: action.answer
          }
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat([action.questionId])
        }
      };
    default:
      return state;
  }
}
