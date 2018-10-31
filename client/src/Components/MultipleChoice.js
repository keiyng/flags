import React, { Component } from 'react';
import _ from 'lodash';

class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      selected: '',
      answered: false,
      message: ''
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.seeResults = this.seeResults.bind(this);
  }

  componentDidMount() {
    // pass answer of current item to list of choices
    // setChoices will return list with answer and 3 other choices
    const choices = this.setChoices(this.props.answer);
    this.setState({ choices: choices });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.answer !== this.props.answer) {
      const choices = this.setChoices(nextProps.answer);
      this.setState({ choices: choices });
    } else if (nextProps.correct !== this.props.correct) {
      this.setState({ message: 'correct!' });
    } else if (nextProps.wrong !== this.props.wrong) {
      this.setState({ message: `Oops! This is the flag of ${this.props.answer}` });
    }
  }

  setChoices(answer) {
    let choices = [];
    choices.push(answer);

    // populate list with 3 other choices
    while (choices.length < 4) {
      let randomItem = _.sample(this.props.continent);
      if (choices.indexOf(randomItem['name']) === -1) {
        choices.push(randomItem['name']);
      }
    }
    return choices;
  }

  displayChoices() {
    const choices = this.state.choices.slice();
    return choices.sort().map(choice => {
      return (
        <div key={choice} className="choices">
          {!this.state.answered ? (
            <li
              value={choice}
              onClick={this.selectAnswer.bind(this, choice)}
            >
              <span className={
                choice === this.state.selected ? 'selected' : 'unselected'
              }>{choice}</span>
            </li>
          ) : (
            <li
              value={choice}
              // className={choice === this.props.answer ? 'answer' : 'unselected'}
            >
              <span className={
                choice === this.props.answer ? 'answer' : 'unselected'
              }>{choice}</span>
            </li>
          )}
        </div>
      );
    });
  }

  selectAnswer(choice) {
    this.setState({ selected: choice });
  }

  checkAnswer() {
    // if submit button hasn't already been clicked once
    if (this.state.selected !== '') {
      if (this.state.selected !== this.props.answer) {
        this.props.recordAnswer(false);
      } else {
        this.props.recordAnswer(true);
      }
      this.setState({ answered: true });
    } else {
      this.setState({
        message: 'Please select an answer'
      });
    }
  }

  nextItem() {
    this.props.generateNext();
    this.setState({
      answered: false,
      message: '',
      selected: ''
    });
  }

  seeResults() {
    this.props.showResults();
  }

  render() {
    return (
      <div id="multipleChoice">
        <ul>{this.displayChoices()}</ul>
        <div className={this.props.ended ? 'hide' : 'show'}>
        {this.state.answered ? (
          <button onClick={this.nextItem}>Next Item</button>
        ) : (
          <button onClick={this.checkAnswer}>Submit</button>
        )}
        <p className="message">{this.state.message}</p>
        </div>

        {this.props.ended && (
          <div>
            <p>You've finished the quiz!</p>
            <button onClick={this.seeResults}>See results</button>
          </div>
        )}
      </div>
    );
  }
}

export default MultipleChoice;
