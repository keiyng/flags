import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

import Dashboard from './Components/Dashboard';
import './styles/styles.scss';

class App extends Component {
  componentDidMount() {
    // the props comes from actions that are passed into the connect() function below
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
