import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import "../Assets/css/home.css";
import { Grid } from "@material-ui/core";

import { observer } from "mobx-react";

const Home = observer(
  class Home extends Component {
    render() {
      {
        console.log(this.props.store);
      }
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
            <br />
            <Link to="/new_project">Create new project</Link>
          </Grid>
        </Grid>
      );
    }
  }
);

export default Home;
