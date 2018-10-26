import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import BranchList from './components/BranchList';
import FeatureForm from './components/FeatureForm';
import '../App.css';
import data from './fakeData.json';

class ProjectPanel extends Component {
  constructor(props) {
    super(props);
    let branchList = data['features'].map((feat) => {
      return(feat['name']);
    });
    console.log(branchList);
    this.state = {
      projectName: data['projectName'],
      branchList: branchList
    };
  }

  render() {
    return(
      <div className="project-col">
        <Row>
          <Col className="header">{this.state.projectName}</Col>
        </Row>
        <Row>
          <Col className="branch-list"><BranchList branchList={this.state.branchList} /></Col>
        </Row>
        <div className="branch-footer">
            <FeatureForm />
        </div>
      </div>
    );
  }
}

export default ProjectPanel;