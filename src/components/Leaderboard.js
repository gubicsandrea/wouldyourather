import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";

class LeaderBoard extends Component {
  render() {
    const { authedUser, userResults } = this.props;
    if (!authedUser) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: "/leaderboard" } }}
        />
      );
    }

    return (
      <React.Fragment>
        {userResults.map(user => (
          <LeaderboardItem key={user.id} user={user} />
        ))}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const userResults = Object.keys(users)
    .map(userId => ({
      id: userId,
      name: users[userId].name,
      avatarURL: users[userId].avatarURL,
      numberOfQuestions: users[userId].questions.length,
      numberOfAnswers: Object.keys(users[userId].answers).length
    }))
    .sort(
      (a, b) =>
        b.numberOfQuestions +
        b.numberOfAnswers -
        (a.numberOfQuestions + a.numberOfAnswers)
    );
  return {
    authedUser,
    userResults
  };
}

export default connect(mapStateToProps)(LeaderBoard);
