import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

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
      <div>
        <h1>Login page</h1>
        <form onSubmit={this.handleLogin}>
          <input
            type="text"
            value={username}
            onChange={this.handleChange}
            placeholder="Enter your username"
          />
          <button type="submit" disabled={username === ""}>
            Log in
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
  };
}

export default connect(mapStateToProps)(LoginPage);
