import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

class Question extends Component {
  render() {
    const { question, author, questionId } = this.props;
    const toPollLink = `/question/${questionId}`;
    return (
      <Col sm={12} md={6} lg={4}>
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
                  <h5>Would you rather</h5>
                  <p>
                    ...{question.optionOne.text.substring(0, 20)}
                    ...
                  </p>
                </Col>
              </Row>
            </Container>
          </Card.Body>
          <Card.Footer>
            <Link to={toPollLink}>
              <Button variant="outline-success" block>
                View Poll
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
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
