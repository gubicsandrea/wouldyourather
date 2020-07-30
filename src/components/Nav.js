import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };

  render() {
    const { authedUser, user } = this.props;
    return (
      <div>
        <Link to="/">Home page</Link>
        <Link to="/add">Ask a question</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {authedUser && (
          <div>
            Hello, {user.name}
            <img src={user.avatarURL} alt="avatar" />
            <span onClick={this.handleLogout}>Logout</span>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: authedUser ? users[authedUser] : null
  };
}

export default connect(mapStateToProps)(Nav);
