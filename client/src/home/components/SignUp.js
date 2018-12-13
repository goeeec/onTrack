import React, { Component } from "react";
import { Grid } from "@material-ui/core";

export default class SignUp extends Component {
  render() {
    return (
      <Grid item sm={5} md={5} lg={5}>
        <div className="signup-box">
          <h2>Manage Your team, </h2>
          <h2>in-sync</h2>
          <p>OnTrack is a team</p>
        </div>
      </Grid>
    );
  }
}
