import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class HomePage extends Component {
  render() {
    const { authedUser, questions } = this.props;
    console.log(authedUser);
    console.log(questions);
    if (authedUser === null) {
      return <Redirect to="/login" />;
    }
    return <div>Home page</div>;
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const allQuestions =
    authedUser !== null
      ? Object.keys(questions).map(questionId => ({
          ...questions[questionId],
          answer: Object.keys(users[authedUser].answers).includes(questionId)
            ? users[authedUser].answers[questionId]
            : null
        }))
      : [];
  return {
    authedUser,
    questions: allQuestions
  };
}

export default connect(mapStateToProps)(HomePage);
