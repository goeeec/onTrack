import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import BranchList from "./BranchList";
import FeatureForm from "./FeatureForm";
class ProjectPanel extends Component {
  render() {
    return (
      <Grid item md={5} sm={12} lg={5} xm={12} className="background">
        <BranchList />
        <FeatureForm />
      </Grid>
    );
  }
}

export default ProjectPanel;
