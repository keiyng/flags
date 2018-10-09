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
      answered: [],
      next: undefined
    };

    this.recordAnswer = this.recordAnswer.bind(this);
    this.generateNext = this.generateNext.bind(this);
  }


  componentWillMount() {
    let randomNext = _.sample(this.state.continent)
    this.setState(prevState => ({
      answered: [...prevState.answered, randomNext],
      next: randomNext
    }))
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
    let randomNext = _.sample(this.state.continent)

    if (!this.state.answered.includes(randomNext['name'])) {
      this.setState(prevState => ({
        answered: [...prevState.answered, randomNext['name']],
        next: randomNext
      }))  
    } else if (this.state.answered.length === this.state.continent.length) {
      this.setState({ended: true})
    } else {
      this.generateNext()
    }
  }



  render() {
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
