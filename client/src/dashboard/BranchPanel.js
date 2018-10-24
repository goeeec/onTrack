import React, { Component } from "react";
import { Row, Col } from "react-materialize";

class BranchPanel extends Component {
  render() {
    return(
      <div className="branch-panel">
        <Row>
          <Col className="header">Branch location</Col>
        </Row>
        <Row>
          <Col className="todo-list">To-do List</Col>
        </Row>
        <Row>
          <Col className="details">Details</Col>
        </Row>
      </div>
    );
  }
}

export default BranchPanel;
