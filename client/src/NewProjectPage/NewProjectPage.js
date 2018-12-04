import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ProjectStepper from './ProjectStepper';
import NavBar from '../home/components/NavBar';

class NewProjectPage extends Component {
  render() {
    return (
      <Grid container alignItems="stretch" justify="space-around" direction="column">
        <Grid item md={12} sm={12} lg={12}>
          <NavBar />
        </Grid>
        <Grid container alignItems="center" justify="space-around" direction="column">
          <Grid item md={6} sm={12} lg={6} xm={12}>
            <h2 style={{ "padding": "1em 1em" }}>New Project</h2>
          </Grid>
          <Grid item md={6} sm={12} lg={6} xm={12} style={{ "width": "50vw" }}>
            <ProjectStepper />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default NewProjectPage;