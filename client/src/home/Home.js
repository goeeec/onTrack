import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import "../Assets/css/home.css";
import { Grid, Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";

import { observer } from "mobx-react";
import ExistingProjectPage from '../ExistingProjectPage/ExistingProjectPage';

const Home = observer(
  class Home extends Component {
    state = {
      open: false
    };

    handleOpen = () => {
      this.setState({ open: true });
    }

    handleClose = () => {
      this.setState({ open: false });
    }

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
            <br />
            <Button variant="contained" color="default" onClick={this.handleOpen}>Existing Project</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>Existing project</DialogTitle>
              <DialogContent>
                <ExistingProjectPage />
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      );
    }
  }
);

export default Home;
