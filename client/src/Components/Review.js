import React, { Component } from 'react';
import Flag from './Flag';
import CountryName from './CountryName';

class Review extends Component {
  constructor(props) {
    super(props);

    this.getReviewObjects = this.getReviewObjects.bind(this);
  }

  renderReviewList() {
    const countries = this.getReviewObjects();
    return countries.map(country => {
      return (
        <li key={country.name}>
          <Flag key={country.flag} country={country} />
          <CountryName key={country.name} country={country} />
        </li>
      );
    });
  }

  getReviewObjects() {
    const countries = this.props.continent.filter(country => {
      return this.props.review.indexOf(country.name) !== -1;
    });
    return countries;
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
