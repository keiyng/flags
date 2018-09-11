import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Flag from '../Flag';
import CountryName from '../CountryName';

class Learning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'All',
      random: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  toggleOrder() {
    this.setState(prevState => ({
      random: !prevState.random
    }));
  }

  handleClick(continent) {
    this.setState({
      current: continent
    });
  }

  renderContent(continent, continentRandom) {

    let continentList = this.state.random ? continentRandom : continent;

    return continentList.map(country => {
      return (
        <div className="content" key={country.name}>
          <Flag key={country.flag} country={country} />
          <CountryName key={country.name} country={country} />
        </div>
      );
    });
  }

  render() {
    const data = this.props.data;
    const dataRandom = this.props.dataRandom;

    return (
      <div>
        <h2>Learning Mode</h2>
        <button onClick={this.toggleOrder}>
          {this.state.random ? 'alphabetical order' : 'random order'}
        </button>
        <Sidebar selected={this.state.current} onClick={this.handleClick} />
        {data[this.state.current] &&
          this.renderContent(data[this.state.current], dataRandom[this.state.current])}
      </div>
    );
  }
}

export default Learning;
