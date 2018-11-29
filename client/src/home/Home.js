import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import "../Assets/css/home.css";
import { Grid } from "@material-ui/core";

export default class Home extends Component {
  render() {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className="container"
      >
        <Grid item md={10} xs={12}>
          <Navbar />
          <h2>This is home page</h2>
          <Link to="/dashboard">dashboard</Link>
        </Grid>
      </Grid>
    );
  }
}
