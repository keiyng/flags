import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Learning from './Modes/Learning';
import Flashcard from './Modes/Flashcard';
import Quiz from './Modes/Quiz';
import Menu from './Menu';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataRandom: {},
      unmount: false
    };
  }

  componentDidMount() {
    let dataObj = {
      All: [],
      Africa: [],
      Asia: [],
      Americas: [],
      Europe: [],
      Oceania: [],
      Others: []
    };
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        if (this.unmount) return;
        for (let i = 0; i < res.data.length; i++) {
          dataObj['All'].push({
            name: res.data[i].name,
            region: res.data[i].region,
            flag: res.data[i].flag,
            code: res.data[i].alpha2Code
          });
          if (res.data[i].region === 'Africa') {
            dataObj['Africa'].push({
              name: res.data[i].name,
              region: res.data[i].region,
              flag: res.data[i].flag,
              code: res.data[i].alpha2Code
            });
          } else if (res.data[i].region === 'Asia') {
            dataObj['Asia'].push({
              name: res.data[i].name,
              region: res.data[i].region,
              flag: res.data[i].flag,
              code: res.data[i].alpha2Code
            });
          } else if (res.data[i].region === 'Americas') {
            dataObj['Americas'].push({
              name: res.data[i].name,
              region: res.data[i].region,
              flag: res.data[i].flag,
              code: res.data[i].alpha2Code
            });
          } else if (res.data[i].region === 'Europe') {
            dataObj['Europe'].push({
              name: res.data[i].name,
              region: res.data[i].region,
              flag: res.data[i].flag,
              code: res.data[i].alpha2Code
            });
          } else if (res.data[i].region === 'Oceania') {
            dataObj['Oceania'].push({
              name: res.data[i].name,
              region: res.data[i].region,
              flag: res.data[i].flag,
              code: res.data[i].alpha2Code
            });
          } else {
            dataObj['Others'].push({
              name: res.data[i].name,
              region: res.data[i].region,
              flag: res.data[i].flag,
              code: res.data[i].alpha2Code
            });
          }
        }
        let data = { ...this.state.data };
        data = JSON.parse(JSON.stringify(dataObj));
        let randomize = JSON.parse(JSON.stringify(dataObj));

        for (let item in randomize) {
            randomize[item].sort((a, b) => {
                return 0.5 - Math.random();
            });
        }
        this.setState({ data: data, dataRandom: randomize });
      })
      .catch(err => {
        console.log(err);
      });
  }

  compoenentWillUnmount() {
    this.unmount = true;
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Menu />
            <Route
              path="/learning"
              render={props => <Learning {...props} data={this.state.data} dataRandom={this.state.dataRandom} />}
            />
            <Route
              path="/flashcard"
              render={props => <Flashcard {...props} data={this.state.data} dataRandom={this.state.dataRandom} />}
            />
            <Route
              path="/quiz"
              render={props => <Quiz {...props} data={this.state.data} dataRandom={this.state.dataRandom} />}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Dashboard;
