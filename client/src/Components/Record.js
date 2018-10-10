import React, { Component } from 'react';
import { connect } from 'react-redux';

class Record extends Component {
    render() {
        return (
            <h1>Record</h1>
        )
    }
};

function mapStateToProps({ auth, record }) {
    return { auth, record };
  }

export default connect(mapStateToProps)(Record);