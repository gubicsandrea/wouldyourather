import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Navigation from "./Navigation";
import Poll from "./Poll";
import Container from "react-bootstrap/Container";

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
            <Container>
              <Navigation />
              <Route path="/" exact component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/question/:id" component={Poll} />
            </Container>
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
