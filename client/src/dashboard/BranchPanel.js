import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import data from './fakeData.json';
import TodoList from './components/TodoList';

class BranchPanel extends Component {
  constructor(props) {
    super(props);
    let selectedBranch = data['features'].filter(feat => feat['name'] === 'dashboard');
    console.log(selectedBranch);
    this.state = {
      selectedBranch: selectedBranch[0]
    };
  }

  render() {
    return(
      <div className="branch-panel">
        <Row>
          <Col className="header">Branch location</Col>
        </Row>
        <Row>
          <Col className="todo-list"><TodoList branch={this.state.selectedBranch} /></Col>
        </Row>
        {/* Add this part after finishing top-half section
        <Row>
          <Col className="details">Details</Col>
        </Row> */}
        
      </div>
    );
  }
}

export default BranchPanel;
