import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import TodoList from "./TodoList";
import TaskForm from "./TaskForm";
class BranchPanel extends Component {
  render() {
    return (
      <Grid item md={5} sm={12} lg={5} xm={12} className="background">
        <Grid>Branch location</Grid>
        <TodoList />
        <TaskForm />
      </Grid>
    );
  }
}

export default BranchPanel;
