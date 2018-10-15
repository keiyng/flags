import React, { Component } from 'react';
import Flag from './Flag';

class Review extends Component {
  constructor(props) {
    super(props);
  }

  renderReviewList () {
      return this.props.review.map(country => {
          return <li key={country}><Flag country={country}/></li>
      })
  }

  render() {
    return (
      <div>
        <ul>{this.renderReviewList()}</ul>
      </div>
    );
  }
}

export default Review;
