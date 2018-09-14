import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

  render() {
    return (
      <div>
        <div>
          <ul>
            <li>
              <Link to="/learning">Learning Mode</Link>
            </li>
            <li>
              <Link to="/flashcard">Flashcard Mode</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz Mode</Link>
            </li>
            <li>
              <Link to="/quiz">Login</Link>
            </li>
            <li>
              <Link to="/">Back</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
