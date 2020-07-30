import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PollForm from "./PollForm";
import PollResult from "./PollResult";

class Poll extends Component {
  render() {
    const { authedUser, author, question, answer } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        {author.name} asks:
        <img src={author.avatarURL} alt={author.name} />
        <h2>Would you rather...</h2>
        {answer === null ? (
          <PollForm questionId={question.id} />
        ) : (
          <PollResult question={question} answer={answer} />
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const answered = authedUser && users[authedUser].answers.hasOwnProperty(id);
  const answer = answered ? users[authedUser].answers[id] : null;
  return {
    authedUser,
    question: authedUser ? questions[id] : {},
    author: authedUser ? users[questions[id].author] : {},
    answer
  };
}

export default connect(mapStateToProps)(Poll);
