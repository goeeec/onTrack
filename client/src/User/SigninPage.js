import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

export default class SigninPage extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Grid>
          <a href="/auth/github">Login with Github</a>
        </Grid>
      </div>
    );
  }
}
