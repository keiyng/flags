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
    this.displayChoices = this.displayChoices.bind(this);
    this.setChoices = this.setChoices.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextItem = this.nextItem.bind(this);
  }

  setChoices = (answer) => {
    let choices = [];
    choices.push(answer);
    while (choices.length < 4) {
        let randomItem = _.sample(this.props.continent)
        if (choices.indexOf(randomItem['name']) === -1) {
          choices.push(randomItem['name']);
        }
      }
    return choices;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.answer !== this.props.answer) {
      const choices = this.setChoices(nextProps.answer);
      this.setState({ choices: choices });
    } else if (nextProps.correct !== this.props.correct) {
      this.setState({message: 'correct!'})
    } else if (nextProps.wrong !== this.props.wrong) {
      this.setState({message: 'wrong!'})
    }
  }

  componentDidMount() {
    const choices = this.setChoices(this.props.answer);
    this.setState({ choices: choices });
  }

  selectAnswer(choice) {
    this.setState({ selected: choice });
  }

  checkAnswer(choice) {
    if (choice !== this.props.answer) {
      this.props.recordAnswer(false)
      this.setState({answered: true})
    }
    else {
      this.props.recordAnswer(true)
      this.setState({answered: true})
    }
  }

  nextItem() {
    this.props.generateNext()
    this.setState({
      answered: false,
      message: '',
      selected: ''
    })
  }

  displayChoices() {
    const choices = this.state.choices.slice();
    return choices.sort().map(choice => {
      return (
        <div key={choice}>
        {!this.state.answered ? 
        <li value={choice} className={choice === this.state.selected ? 'selected' : 'unselected'} onClick={() => this.selectAnswer(choice)}>
        {choice}
        </li> : 
        <li value={choice} className={choice === this.props.answer ? 'answer' : 'unselected'}>
        {choice}
        </li>}
        </div>
      );
    });
  }

  

  render() {

    console.log('answer:' + this.props.answer)

    return (
      <div>
        <ul>{this.displayChoices()}</ul>
        <p>{this.state.message}</p>
       <button onClick={() => {this.checkAnswer(this.state.selected)}}>Click to Submit</button>
       <button onClick={() => {this.nextItem()}}>Next Item</button>
      </div>
    );
  }
}

export default MultipleChoice;
