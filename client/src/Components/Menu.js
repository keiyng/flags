import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
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
            {mode}
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
    return (
      <div>
        <div>
          {this.props.auth && <p>Hello, {this.props.auth.userName}!</p>}
          <ul>
            {this.modeMenu()}
            {this.authStatus()}
            {this.props.auth && (
              <li>
                <Link
                  to="/record"
                  onClick={this.selectMode.bind(this, 'attempts')}
                  className={
                    this.state.selected === 'attempts' ? 'selected' : 'unselected'
                  }
                >
                  Your Attempts
                </Link>
              </li>
            )}
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
