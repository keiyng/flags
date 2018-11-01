import React from 'react';
import { connect } from 'react-redux';

const Header = ({auth}) => {
  return (
    <div id="header">
      <div id="greeting">
        {auth && <p>Hello, {auth.userName}!</p>}
      </div>
      <h1>How many country flags do you know?</h1>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
