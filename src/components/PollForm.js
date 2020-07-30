import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";

class PollForm extends Component {
  state = {
    option: ""
  };

  handleChangeSelection = option => {
    this.setState(() => ({
      option
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, authedUser, question } = this.props;
    dispatch(
      handleSaveQuestionAnswer({
        userId: authedUser,
        questionId: question.id,
        answer: this.state.option
      })
    );
  };
  render() {
    const { question } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="radio"
          id="optionOne"
          value="optionOne"
          name="option"
          onChange={e => this.handleChangeSelection(e.target.value)}
        />
        <label htmlFor="optionOne">{question.optionOne.text}</label>
        <input
          type="radio"
          id="optionTwo"
          value="optionTwo"
          name="option"
          onChange={e => this.handleChangeSelection(e.target.value)}
        />
        <label htmlFor="optionTwo">{question.optionTwo.text}</label>
        <button type="submit" disabled={this.state.option === ""}>
          Submit
        </button>
      </form>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { questionId }) {
  return {
    authedUser,
    question: authedUser ? questions[questionId] : {}
  };
}

export default connect(mapStateToProps)(PollForm);
