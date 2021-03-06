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
      if (this.state.selected === mode) {
        return (
          <button
            key={mode}
            className={this.state.selected === mode ? 'selected' : 'unselected'}
          >
            {mode === 'Flashcard' ? `Learn with ${mode}s` : `Take the ${mode}`}
          </button>
        );
      } else {
        return (
          <button key={mode} type="button">
            <Link
              to={`/${mode}`}
              onClick={this.selectMode.bind(this, mode)}
              className={
                this.state.selected === mode ? 'selected' : 'unselected'
              }
            >
              {mode === 'Flashcard'
                ? `Learn with ${mode}s`
                : `Take the ${mode}`}
            </Link>
          </button>
        );
      }
    });
  }

  authStatus() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <button>
            <a href="/auth/google">Sign in with Google</a>
          </button>
        );
      default:
        return (
          <button>
            <a href="/api/logout">Logout</a>
          </button>
        );
    }
  }
  render() {
    return (
      <div>
        <div id="menu">
          {this.modeMenu()}

          {this.props.auth && (
            <button>
              <Link
                to="/record"
                onClick={this.selectMode.bind(this, 'attempts')}
                className={
                  this.state.selected === 'attempts' ? 'selected' : 'unselected'
                }
              >
                Your Achievements
              </Link>
            </button>
          )}

          {this.authStatus()}

          <button>
            <Link
              to="/"
              onClick={this.selectMode.bind(this, 'home')}
              className={
                this.state.selected === 'home' ? 'selected' : 'unselected'
              }
            >
              Home
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Menu);
