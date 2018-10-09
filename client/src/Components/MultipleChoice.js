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
      this.setState({ message: 'wrong!' });
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
        <div key={choice}>
          {!this.state.answered ? (
            <li
              value={choice}
              className={
                choice === this.state.selected ? 'selected' : 'unselected'
              }
              onClick={this.selectAnswer.bind(this, choice)}
            >
              {choice}
            </li>
          ) : (
            <li
              value={choice}
              className={choice === this.props.answer ? 'answer' : 'unselected'}
            >
              {choice}
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
    if (this.props.ended) {
      console.log('ended!!!!');
    } else {
      // if submit button hasn't already been clicked once
      if (this.state.selected !== '') {
        if (this.state.selected !== this.props.answer) {
          this.props.recordAnswer(false);
          this.setState({ answered: true });
        } else {
          this.props.recordAnswer(true);
          this.setState({ answered: true });
        }
      } else {
        this.setState({
          message: 'Please select and answer first'
        });
      }
    }
  }

  nextItem() {
    if (this.props.ended) {
      console.log('ended!!!!');
    } else {
      this.props.generateNext();
      this.setState({
        answered: false,
        message: '',
        selected: ''
      });
    }
  }

  render() {
    console.log('answer:' + this.props.answer);

    return (
      <div>
        <ul>{this.displayChoices()}</ul>
        <p>{this.state.message}</p>
        {this.state.answered ? (
          <button onClick={this.nextItem}>Next Item</button>
        ) : (
          <button onClick={this.checkAnswer}>Click to Submit</button>
        )}
      </div>
    );
  }
}

export default MultipleChoice;
