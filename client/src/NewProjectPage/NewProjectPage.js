import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ProjectStepper from './ProjectStepper';

class NewProjectPage extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={40}>
        <Grid item md={8} sm={12} lg={8} xm={12}>
          <h2>New Project</h2>
          <ProjectStepper />
        </Grid>
      </Grid>
    );
  }
}

export default NewProjectPage;