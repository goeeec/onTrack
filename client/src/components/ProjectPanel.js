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
      <Grid>
        <Grid className="header"> {this.state.projectName} </Grid>

        <Grid item md={6} sm={6} lg={6} xm={6} className="background">
          <BranchList branchList={this.state.branchList} />
          <FeatureForm />
        </Grid>

        <div className="branch-footer">{/* <FeatureForm /> */}</div>
      </Grid>
    );
  }
}

export default ProjectPanel;
