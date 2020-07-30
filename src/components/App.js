import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Nav from "./Nav";
import Poll from "./Poll";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loading } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {loading === true ? null : (
            <div>
              <Nav />
              <Route path="/" exact component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/question/:id" component={Poll} />
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    loading: users === []
  };
}

export default connect(mapStateToProps)(App);
