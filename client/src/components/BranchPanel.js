import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Grid } from "@material-ui/core";
import TodoList from "./TodoList";
class BranchPanel extends Component {
  render() {
    return (
      <Grid item md={5} sm={12} lg={5} xm={12} className="background">
        <Grid>Branch location</Grid>
        <TodoList />
      </Grid>
    );
  }
}

export default BranchPanel;
