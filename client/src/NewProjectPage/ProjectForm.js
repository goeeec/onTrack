import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  FormHelperText
} from "@material-ui/core";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      name: this.props.project.name,
      description: this.props.project.description
    };
  }

  render() {
    return (
      <Grid container justify="center" style={{ display: 'flex', justifyContent: 'center', padding: "1vw" }}>
        <Grid item lg={8} md={8} sm={8}>
          <FormControl error={this.state.isChanged && !this.state.name}>
            <InputLabel htmlFor="component-simple">Project Name</InputLabel>
            <Input
              id="project-name"
              defaultValue={this.state.name ? this.state.name : ""}
              required
              onChange={e => {
                this.setState({ isChanged: true, name: e.target.value });
                this.props.updateProjectName(e.target.value);
              }}
            />
            <FormHelperText>Project name is required</FormHelperText>
          </FormControl>
          <br />
          <FormControl>
            <InputLabel htmlFor="component-simple">Description</InputLabel>
            <Input
              id="project-descr"
              defaultValue={
                this.state.description ? this.state.description : ""
              }
              required
              onChange={e =>
                this.props.updateProjectDescription(e.target.value)
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default ProjectForm;
