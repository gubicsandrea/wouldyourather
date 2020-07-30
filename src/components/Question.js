import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Question extends Component {
  render() {
    const { question, author, questionId } = this.props;
    const toPollLink = `/question/${questionId}`;
    return (
      <div>
        {author.name} asks:
        <img src={author.avatarURL} alt={author.name} />
        Would you rather ...{question.optionOne.text.substring(0, 20)}...
        <Link to={toPollLink}>View Poll</Link>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { questionId }) {
  return {
    question: questions[questionId],
    author: users[questions[questionId].author]
  };
}

export default connect(mapStateToProps)(Question);
