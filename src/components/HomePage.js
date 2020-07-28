import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class HomePage extends Component {
  state = {
    answeredVisible: false,
    buttonText: "View Answered Question"
  };

  handleButtonClick = () => {
    this.setState(prevState => ({
      answeredVisible: !prevState.answeredVisible,
      buttonText: prevState.answeredVisible
        ? "View Answered Questions"
        : "View Unanswered Questions"
    }));
  };

  render() {
    const {
      authedUser,
      answeredQuestionIds,
      unansweredQuestionIds
    } = this.props;

    if (authedUser === null) {
      return <Redirect to="/login" />;
    }

    const questionIds = this.state.answeredVisible
      ? answeredQuestionIds
      : unansweredQuestionIds;

    return (
      <div>
        <h1>Home page</h1>
        <button onClick={this.handleButtonClick}>
          {this.state.buttonText}
        </button>
        <ul>
          {questionIds.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const answeredQuestionIds =
    authedUser !== null
      ? Object.keys(questions).filter(
          id =>
            questions[id].optionOne.votes.includes(authedUser) ||
            questions[id].optionTwo.votes.includes(authedUser)
        )
      : [];
  const unansweredQuestionIds =
    authedUser !== null
      ? Object.keys(questions).filter(
          id =>
            !questions[id].optionOne.votes.includes(authedUser) &&
            !questions[id].optionTwo.votes.includes(authedUser)
        )
      : [];
  return {
    authedUser,
    answeredQuestionIds,
    unansweredQuestionIds,
    users
  };
}

export default connect(mapStateToProps)(HomePage);
