import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Menu from './Menu';
import Flashcard from './Modes/Flashcard';
import Quiz from './Modes/Quiz';
import Record from './Record';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataRandom: {},
      error: false
    };
  }

  componentDidMount() {
    let dataObj = {
      All: [],
      Africa: [],
      Asia: [],
      Americas: [],
      Europe: [],
      Oceania: []
    };

    axios
      .get('https://restcountries.eu/rest/v2/all', {cancelToken: source.token})
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          dataObj['All'].push({
            name: res.data[i].name,
            region: res.data[i].region,
            flag: res.data[i].flag,
            code: res.data[i].alpha2Code
          });
          
          if (Object.keys(dataObj).includes(res.data[i].region)) {
            dataObj[res.data[i].region].push({
              name: res.data[i].name,
              region: res.data[i].region,
              flag: res.data[i].flag,
              code: res.data[i].alpha2Code
            });
          }
        }

        // deep copy objects
        let data = JSON.parse(JSON.stringify(dataObj));
        let dataRandom = JSON.parse(JSON.stringify(dataObj));

        for (let item in dataRandom) {
          dataRandom[item].sort((a, b) => {
                return 0.5 - Math.random();
            });
        }
        this.setState({ data: data, dataRandom: dataRandom });

      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('request is cancelled:', err.message)
        }
        else if (err.response.status !== 200) {
          this.setState({error: true})
        }
      });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Menu />
            <Route
              path="/flashcard"
              render={props => <Flashcard {...props} data={this.state.data} dataRandom={this.state.dataRandom} />}
            />
            <Route
              path="/quiz"
              render={props => <Quiz {...props} data={this.state.data} dataRandom={this.state.dataRandom} />}
            />
            <Route
              path="/record"
              render={props => <Record {...props} />}
            />
          </div>
        </BrowserRouter>
        {this.state.error && <p>There is an error fetching the content. Please try again. </p>}
      </div>
    );
  }
}

export default Dashboard;
