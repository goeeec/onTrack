import React, { Component } from "react";
import { Grid } from "@material-ui/core";

export default class SignUp extends Component {
  render() {
    return (
      <Grid item sm={5} md={5} lg={5}>
        <div className="signup-box">
          <h1>OnTrack</h1>
          <h3>Project management tool using Feature Branch Workflow</h3>
        </div>
      </Grid>
    );
  }
}
