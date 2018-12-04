import React, { Component } from "react";
import {
  Grid,
  InputLabel,
  FormControl,
  Input,
  InputAdornment,
  Button,
  FormHelperText,
  Switch
} from "@material-ui/core";
import axios from "axios";
import { EventEmitter } from "events";

class ExistingProjectPage extends Component {
  state = {
    isCreated: false,
    isCurrentUser: true
  };

  handleSubmit = async () => {
    const repo = (await axios.get(
      "/github/repos/" + document.getElementById("project-name").value
    )).data;
    const branches = (await axios.get(
      "/github/branches/" + repo.owner.login + "/" + repo.name
    )).data;
    try {
      const res = await axios.post("/api/project", {
        projectId: repo.id,
        name: repo.name,
        cloneUrl: repo.cloneUrl,
        description: repo.description,
        branches: branches.map(branch => branch.ref),
        owner: this.state.isCurrentUser
          ? repo.owner.login
          : document.getElementById("username").value
      });
      if (res.status === 201) {
        this.setState({ isCreated: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleSwitchChange = event => {
    this.setState({ isCurrentUser: event.target.checked });
  };

  render() {
    if (this.state.isCreated) {
      return <div>Successfully loaded</div>;
    }
    return (
      <Grid container justify="center">
        <Grid item sm={12} md={12} lg={12}>
          <Switch
            checked={this.state.isCurrentUser}
            onChange={this.handleSwitchChange}
            value="isCurrentUser"
          />
          {this.state.isCurrentUser ? (
            ""
          ) : (
            <FormControl>
              <InputLabel>Username:</InputLabel>
              <Input id="username" />
            </FormControl>
          )}
          <br />
          <FormControl>
            <InputLabel>Project name:</InputLabel>
            <Input
              id="project-name"
              endAdornment={
                <InputAdornment position="end">
                  <Button onClick={this.handleSubmit}>Submit</Button>
                </InputAdornment>
              }
            />
            <FormHelperText>
              This will only look for the repositories in your account
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default ExistingProjectPage;
