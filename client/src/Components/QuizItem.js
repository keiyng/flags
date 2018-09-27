import React, { Component } from 'react';
import Flag from './Flag';
import MultipleChoice from './MultipleChoice';

import _ from 'lodash';

class QuizItem extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      continent: this.props.continent,
      wrong: 0,
      correct: 0,
      ended: false,
      answer: '',
      tested: [],
      next: undefined
    };

    this.recordAnswer = this.recordAnswer.bind(this);
    this.generateNext = this.generateNext.bind(this);
  }

  recordAnswer(choice) {
    if (choice) {
      this.setState(prevState => ({
        correct: (prevState.correct + 1),
      }))
    } else {
      this.setState(prevState => ({
        wrong: (prevState.wrong += 1),
      }))
    }
  }

  generateNext() {
    let nextRandom = _.sample(this.state.continent)

    if (!this.state.tested.includes(nextRandom['name'])) {
      this.setState(prevState => ({
        tested: [...prevState.tested, nextRandom['name']],
        next: nextRandom
      }))  
    } else if (this.state.tested.length === this.state.continent.length) {
      this.setState({ended: true})
    } else {
      this.generateNext()
    }
  }

  componentWillMount() {
    let nextRandom = _.sample(this.state.continent)
    this.setState(prevState => ({
      tested: [...prevState.tested, nextRandom],
      next: nextRandom
    }))
  }


  render() {
    // console.log('this.state.tested.length: ' + this.state.tested.length)
    // console.log('this.state.continent.length: ' + this.state.continent.length)
    console.log('this.state.correct: ' + this.state.correct)
    console.log('this.state.wrong: ' + this.state.wrong)

    return (
      <div>
        {this.state.ended ? <p>Ended</p> : (
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
              />
          </div>
        )}
      </div>
    );
  }
}

export default QuizItem;
