import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import ProjectPanel from './ProjectPanel';
import BranchPanel from './BranchPanel';
import '../App.css';

class Dashboard extends Component {
  render() {
    return(
      <div className="project-panel">
        <Row>
          <Col s={1} className="grid side-bar">Side Nav</Col>
          <Col s={3} className="grid projectPanel"><ProjectPanel /></Col>
          <Col s={8} className="grid"><BranchPanel /></Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;