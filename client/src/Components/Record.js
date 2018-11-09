import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attempts: undefined
    };
  }

  componentDidMount() {
    let attempts = [];

    axios
      .get('/api/user_attempts')
      .then(res => {
        for(let i=0; i<res.data.length; i++) {
            attempts.push(res.data[i])
        }
        this.setState({ attempts: attempts });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderAttempts() {
    if (this.state.attempts.length === 0) {
      return (
        <div id="noRecord">
          <p>You don't have any record yet. </p>
          <p><Link to="/quiz">Take the quiz</Link> now!</p>
        </div>
      );
    }
    return this.state.attempts.map((attempt, index) => {
      return (
        <div key={attempt._id} id="records">
          <div>{index+1}</div>
          <div>
          <ul>
            <li>Date: {attempt.date.substring(0,10)}</li>
            <li>Continent: {attempt.continent}</li>
            <li>Score: {attempt.score}</li>
          </ul>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.attempts && this.renderAttempts()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Record);
