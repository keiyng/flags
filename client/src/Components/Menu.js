import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Flashcard'
    };
  }

  selectMode(mode) {
    this.setState({
      selected: mode
    });
  }

  modeMenu() {
    const modes = ['Flashcard', 'Quiz'];
    return modes.map(mode => {
      return (
        <li key={mode}>
          <Link
            to={`/${mode}`}
            onClick={this.selectMode.bind(this, mode)}
            className={this.state.selected === mode ? 'selected' : 'unselected'}
          >
            {mode} Mode
          </Link>
        </li>
      );
    });
  }

  authStatus() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Sign in with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    console.log("this.props.auth:" + this.props.auth)
    return (
      <div>
        <div>
          <ul>
            {this.modeMenu()}
            {this.authStatus()}
            <li>
              <Link to="/">Back</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Menu);
