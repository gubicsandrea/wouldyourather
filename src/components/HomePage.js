import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Question from "./Question";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
      <React.Fragment>
        <Row>
          <Col>
            <h1>Home page</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" onClick={this.handleButtonClick} block>
              {this.state.buttonText}
            </Button>
          </Col>
        </Row>
        <Row>
          {questionIds.map(id => (
            <Question key={id} questionId={id} />
          ))}
        </Row>
      </React.Fragment>
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
