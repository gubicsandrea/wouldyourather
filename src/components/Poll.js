import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import PollForm from "./PollForm";
import PollResult from "./PollResult";

class Poll extends Component {
  render() {
    const { authedUser, author, question, answer } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>{author.name} asks:</Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <Col sm="auto">
                    <Image
                      src={author.avatarURL}
                      alt={author.name}
                      roundedCircle
                    />
                  </Col>
                  <Col>
                    <Card.Title>Would you rather...</Card.Title>
                    {answer === null ? (
                      <PollForm questionId={question.id} />
                    ) : (
                      <PollResult question={question} answer={answer} />
                    )}
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
