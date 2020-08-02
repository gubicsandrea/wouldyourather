import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class LoginPage extends Component {
  state = {
    username: "",
    success: false
  };

  handleChange = e => {
    const username = e.target.value;

    this.setState(() => ({
      username
    }));
  };

  handleLogin = e => {
    e.preventDefault();
    const { dispatch, userIds } = this.props;
    const { username } = this.state;
    if (userIds.includes(username)) {
      dispatch(setAuthedUser(username));
      console.log("Logged in user: ", username);
      this.setState(() => ({
        username: "",
        success: true
      }));
    } else {
      console.log("Invalid user: ", username);
      alert("Invalid username");
    }
  };

  render() {
    const { username, success } = this.state;

    if (success === true) {
      return <Redirect to="/" />;
    }
    return (
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>Please log in</Card.Header>
            <Form onSubmit={this.handleLogin} style={{ margin: "1rem" }}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Enter your username"
                />
              </Form.Group>
              <Button
                variant="outline-success"
                type="submit"
                disabled={username === ""}
                block
              >
                Log in
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
  };
}

export default connect(mapStateToProps)(LoginPage);
