import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Flag from '../Flag';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'All'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(continent) {
    this.setState({
      current: continent
    });
  }

  render() {
    return (
      <div>
    <h2>Quiz Mode</h2>
    <Sidebar onClick={this.handleClick} />
    </div>
    );
  }
}

export default Quiz;