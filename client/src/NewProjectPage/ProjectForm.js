import React, { Component } from 'react';
import { 
  FormControl,
  InputLabel,
  Input,
  Grid
} from '@material-ui/core';

class ProjectForm extends Component {
  render() {
    return(
      <Grid container justify="center">
        <Grid item lg={8} md={8} sm={8}>
          <FormControl margin="normal">
            <InputLabel htmlFor="component-simple">Project Name</InputLabel>
            <Input required margin="normal" />
          </FormControl>
          <br />
          <FormControl margin="normal">
            <InputLabel htmlFor="component-simple">Description</InputLabel>
            <Input required />
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default ProjectForm;