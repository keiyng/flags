import React, { Component } from 'react';
import Dashboard from './Components/Dashboard';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <h1>World Flags</h1>
        <Dashboard />
      </div>
    );
  }
}

export default App;
