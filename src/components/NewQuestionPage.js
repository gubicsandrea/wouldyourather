import React, { Component } from "react";
import { handleSaveNewQuestion } from "../actions/shared";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NewQuestionPage extends Component {
  state = {
    optionOne: "",
    optionTwo: ""
  };

  handleTextOneChange = e => {
    const text = e.target.value;
    this.setState({
      optionOne: text
    });
  };

  handleTextTwoChange = e => {
    const text = e.target.value;
    this.setState({
      optionTwo: text
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(
      handleSaveNewQuestion({
        optionOneText: this.state.optionOne,
        optionTwoText: this.state.optionTwo,
        author: this.props.authedUser
      })
    );
    this.props.history.push("/");
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    const { authedUser } = this.props;
    if (!authedUser) {
      return <Redirect to={{ pathname: "/login", state: { from: "/add" } }} />;
    }
    return (
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>Create New Question</Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Option One Text</Form.Label>
                  <Form.Control
                    type="text"
                    value={optionOne}
                    onChange={e => this.handleTextOneChange(e)}
                    placeholder="Enter option one text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Option Two Text</Form.Label>
                  <Form.Control
                    type="text"
                    value={optionTwo}
                    onChange={e => this.handleTextTwoChange(e)}
                    placeholder="Enter option two text"
                  />
                </Form.Group>
                <Button
                  variant="outline-success"
                  type="submit"
                  disabled={optionOne === "" || optionTwo === ""}
                  block
                >
                  Add
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewQuestionPage);
