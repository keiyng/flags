import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
    case false:
        return  <li><a href="/auth/google">Sign in with Google</a></li>;
    default:
      return <li><a href="/api/logout">Logout</a></li>;
      }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <ul>
            {/* <li>
              <Link to="/learning">Learning Mode</Link>
            </li> */}
            <li>
              <Link to="/flashcard">Flashcard Mode</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz Mode</Link>
            </li>
              {this.renderContent()}
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
