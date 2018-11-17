import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import BranchList from './BranchList';
import FeatureForm from './FeatureForm';
import '../App.css';
import data from '../fakeData.json';

class ProjectPanel extends Component {
  constructor(props) {
    super(props);
    let branchList = data['features'].map((feat) => {
      return(feat['name']);
    });
    console.log("BranchList in ProjectPanel: ");
    console.log(branchList);
    this.state = {
      projectName: data['projectName'],
      branchList: branchList
    };
  }

  addFeature = (newFeature) => {
    this.setState({
      branchList: [...this.state.branchList, newFeature]
    });
  }

  render() {
    return(
      <div className="project-col">
        <Row>
          <Col className="header">{this.state.projectName}</Col>
        </Row>
        <Row>
          <Col className="branch-list"><BranchList /></Col>
        </Row>
        <div className="branch-footer">
            <FeatureForm handleAdd={this.addFeature} />
        </div>
      </div>
    );
  }
}

export default ProjectPanel;