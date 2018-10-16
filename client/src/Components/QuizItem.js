import React, { Component } from 'react';
import Flag from './Flag';
import MultipleChoice from './MultipleChoice';
import Review from './Review';
import * as actions from '../actions';

import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';


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
      next: undefined,
      showResults: false,
      message: '',
      error: false,
      review: []
    };

    this.recordAnswer = this.recordAnswer.bind(this);
    this.generateNext = this.generateNext.bind(this);
    this.showResults = this.showResults.bind(this);
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
        wrong: (prevState.wrong += 1),
        review: [...prevState.review, this.state.next['name']]
      }));
    }
    if (this.state.answered.length === this.state.continent.length) {
      this.setState({ ended: true });
      // save results for authenticated user
      if (this.props.auth) {
        this.saveResults();
      } else {
        return true;
      }
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
    axios
      .post('/api/save_results', {
        date: new Date().toDateString(),
        continent: this.state.continentName,
        score:
          this.state.correct.toString() +
          '/' +
          this.state.continent.length.toString()
      })
      .then(res => {
        this.setState({
          message: res.data.message
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.log(err);
      });
  }

  showResults() {
    this.setState({
      showResults: true
    });
  }

  render() {
    // console.log(this.state.answered.length + '/' + this.state.continent.length);
    return (
      <div>
        {this.state.ended && this.state.showResults ? (
          <div>
            <h2>End of Quiz</h2>
            <div>
              You got {this.state.correct}/{this.state.continent.length} flags
              right!
              <div>
                {this.state.message}
                {this.state.error ? 'An error has occured' : ''}
              </div>
              <div>
                Let's review what you got wrong:
                <Review
                  review={this.state.review}
                  continent={this.state.continent}
                />
              </div>
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
              ended={this.state.ended}
              showResults={this.showResults}
            />
          </div>
        )}

      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(QuizItem);
