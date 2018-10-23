import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import Sidebar from '../Sidebar';
import QuizItem from '../QuizItem';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      inProgress: false,
      ended: undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
  }

  handleClick(continent) {
    this.setState({
      current: continent
    });
  }

  startQuiz() {
    this.setState({ inProgress: true });
  }

  endQuiz() {
    this.setState({ended: true})
  }

  render() {
    return (
      <div>
        {!this.state.inProgress && (
          <Sidebar selected={this.state.current} onClick={this.handleClick} />
        )}

        {this.state.current === '' ? (
          <p>Please choose a section</p>
        ) : (
          !this.state.inProgress && (
            <button onClick={this.startQuiz}>Click to start</button>
          )
        )}

        {this.state.inProgress && (
          <QuizItem
            continent={this.props.data[this.state.current]}
            continentName={this.state.current}
            endQuiz={this.endQuiz}
          />
        )}
        <Prompt
          when={!this.state.ended}
          message="Are you sure you want to leave the quiz? Your progress will be lost."
        />
      </div>
    );
  }
}

export default Quiz;
