import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Flag from '../Flag';
import CountryName from '../CountryName';

class Flashcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'All',
      show: [],
      random: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.showName = this.showName.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }


  toggleOrder() {
    this.setState(prevState => ({
      random: !prevState.random
    }));
  }

  showName(countryName) {
    if (this.state.show.includes(countryName)) {
      let show = this.state.show.slice();
      const index = show.indexOf(countryName);
      show.splice(index, 1);
      this.setState({ show: show });
    } else {
      this.setState(prevState => ({
        show: [...prevState.show, countryName]
      }));
    }
  }

  handleClick(continent) {
    this.setState({
      current: continent
    });
  }

  renderContent(continent, continentRandom) {
    let continentList = this.state.random
      ? continentRandom
      : continent;

    return continentList.map(country => {
      return (
        <div
          className="content"
          onClick={() => this.showName(country.name)}
          key={country.name}
        >
          <Flag key={country.flag} country={country} />
          {this.state.show.includes(country.name) && (
            <div className="flashcardName">
              <CountryName key={country.name} country={country} />
            </div>
          )}
        </div>
      );
    });
  }

  render() {
    const data = this.props.data;
    const dataRandom = this.props.dataRandom;
    
    return (
      <div>
        <h2>Flashcard Mode</h2>
        <button onClick={this.toggleOrder}>
          {this.state.random ? 'alphabetical order' : 'random order'}
        </button>
        <Sidebar onClick={this.handleClick} />

        {data[this.state.current] &&
          this.renderContent(data[this.state.current], dataRandom[this.state.current])}
      </div>
    );
  }
}

export default Flashcard;
