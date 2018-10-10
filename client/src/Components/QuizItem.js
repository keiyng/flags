import React, { Component } from 'react';
import Flag from './Flag';
import MultipleChoice from './MultipleChoice';
import * as actions from '../actions';

import _ from 'lodash';
import { connect } from 'react-redux';

class QuizItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continent: this.props.continent,
      continentName: this.props.continentName,
      wrong: 0,
      correct: 0,
      ended: false,
      answer: '',
      answered: [],
      next: undefined
    };

    this.recordAnswer = this.recordAnswer.bind(this);
    this.generateNext = this.generateNext.bind(this);
  }

  componentWillMount() {
    let randomNext = _.sample(this.state.continent);
    this.setState(prevState => ({
      answered: [...prevState.answered, randomNext],
      next: randomNext
    }));
  }

  recordAnswer(choice) {
    if (choice) {
      this.setState(prevState => ({
        correct: prevState.correct + 1
      }));
    } else {
      this.setState(prevState => ({
        wrong: (prevState.wrong += 1)
      }));
    }
    if (this.state.answered.length === this.state.continent.length) {
      this.setState({ ended: true });
      this.saveResults();
    }
  }

  generateNext() {
    let randomNext = _.sample(this.state.continent);

    if (!this.state.answered.includes(randomNext['name'])) {
      this.setState(prevState => ({
        answered: [...prevState.answered, randomNext['name']],
        next: randomNext
      }));
    } else {
      this.generateNext();
    }
  }

  saveResults() {
    this.props.saveResults({
      userID: this.props.auth.userID,
      results: {
        date: new Date(),
        continent: this.state.continentName,
        score:
          this.state.correct.toString() +
          '/' +
          this.state.continent.length.toString()
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.ended ? (
          <div>
            <h2>End of Quiz</h2>
            <div>
              You got {this.state.correct}/{this.state.continent.length} flags
              right!
            </div>
          </div>
        ) : (
          <div>
            <Flag country={this.state.next} />
            <MultipleChoice
              continent={this.state.continent}
              answer={this.state.next['name']}
              recordAnswer={this.recordAnswer}
              generateNext={this.generateNext}
              correct={this.state.correct}
              wrong={this.state.wrong}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ auth, record }) {
  return { auth, record };
}

export default connect(
  mapStateToProps,
  actions
)(QuizItem);
