import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Navigation extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };

  render() {
    const { authedUser, user } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Navbar expand="sm">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link to="/">
                    <Button variant="success">Home page</Button>
                  </Link>
                  <Link to="/add">
                    <Button variant="success">Ask a question</Button>
                  </Link>
                  <Link to="/leaderboard">
                    <Button variant="success">Leaderboard</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          {authedUser && (
            <Col md="auto">
              <Image src={user.avatarURL} alt="avatar" roundedCircle />
              <span> {user.name} </span>
              <Button variant="outline-success" onClick={this.handleLogout}>
                Logout
              </Button>
            </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: authedUser ? users[authedUser] : null
  };
}

export default connect(mapStateToProps)(Navigation);
