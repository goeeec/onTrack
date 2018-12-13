import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import "../Assets/css/home.css";
import { Grid, Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import NewProjectPage from "../NewProjectPage/NewProjectPage";

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
      return (
        <div>
          <div className="home-img"></div>
          <Grid
            container
            alignItems="center"
            justify="center"
            className="container"
          >
            <Grid item md={10} xs={12}>
              <div className="nav"><Navbar /></div>
              <div className="content">
                <h1>Manage your projects</h1>
                <Button className="dash_button" color="secondary" variant="contained" component={Link} to="/dashboard">dashboard</Button>
                <br />
                <div className="row">
                  <NewProjectPage />
                  <br />
                  <Button className="dash_button column" color="primary" variant="outlined" onClick={this.handleOpen}>Existing Project</Button>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>Existing project</DialogTitle>
                  <DialogContent>
                    <ExistingProjectPage />
                  </DialogContent>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        </div>

      );
    }
  }
);

export default Home;


