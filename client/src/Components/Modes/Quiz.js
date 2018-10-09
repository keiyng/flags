import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import QuizItem from '../QuizItem';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      inProgress: false,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  handleClick(continent) {
    this.setState({
      current: continent
    });
  }

  startQuiz() {
    this.setState({
      inProgress: true
    });
  }

  render() {
    return (
      <div>
        {!this.state.inProgress && <Sidebar selected={this.state.current} onClick={this.handleClick} />}
        {this.state.current === '' ? (
          <p>choose a section first</p>
        ) : (
          !this.state.inProgress && <button onClick={this.startQuiz}>Click to start</button>
        )}
        {this.state.inProgress && <QuizItem continent={this.props.data[this.state.current]}/>}
      </div>
    );
  }
}

export default Quiz;
