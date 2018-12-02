import React, { Component } from 'react';

class SuccessPage extends Component {
  render() {
    return(
      <div>
        <h2>Success!</h2>
        Clone your project here: <br />
        <code>{this.props.project.cloneUrl}</code>
      </div>
    );
  }
}

export default SuccessPage;