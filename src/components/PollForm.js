import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Check
          type="radio"
          id="optionOne"
          name="option"
          value="optionOne"
          label={question.optionOne.text}
          onChange={e => this.handleChangeSelection(e.target.value)}
        />
        <Form.Check
          type="radio"
          id="optionTwo"
          name="option"
          value="optionTwo"
          label={question.optionTwo.text}
          onChange={e => this.handleChangeSelection(e.target.value)}
        />
        <Button
          variant="outline-success"
          type="submit"
          disabled={this.state.option === ""}
          block
        >
          Submit
        </Button>
      </Form>
    );
  }
}

function mapStateToProps({ authedUser, questions }, { questionId }) {
  return {
    authedUser,
    question: authedUser ? questions[questionId] : {}
  };
}

export default connect(mapStateToProps)(PollForm);
