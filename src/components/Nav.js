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
    const { authedUser } = this.props;
    return (
      <div>
        <Link to="/">Home page</Link>
        <Link to="/add">Ask a question</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {authedUser && <span onClick={this.handleLogout}>Logout</span>}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);
