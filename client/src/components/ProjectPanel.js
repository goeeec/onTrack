import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import BranchList from "./BranchList";
import FeatureForm from "./FeatureForm";
// import '../App.css';
import data from "../fakeData.json";

class ProjectPanel extends Component {
  constructor(props) {
    super(props);
    let branchList = data["features"].map(feat => {
      return feat["name"];
    });
    console.log("BranchList in ProjectPanel: ");
    console.log(branchList);
    this.state = {
      projectName: data["projectName"],
      branchList: branchList
    };
  }

  addFeature = newFeature => {
    this.setState({
      branchList: [...this.state.branchList, newFeature]
    });
  };

  render() {
    return (
      <Grid item md={5} sm={12} lg={5} xm={12} className="background">
        <BranchList branchList={this.state.branchList} />
        <FeatureForm newFeature={this.addFeature} />
      </Grid>
    );
  }
}

export default ProjectPanel;
