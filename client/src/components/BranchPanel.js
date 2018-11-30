import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Grid } from "@material-ui/core";
import data from "../fakeData.json";
import TodoList from "./TodoList";

class BranchPanel extends Component {
  constructor(props) {
    super(props);
    let selectedBranch = data["features"].filter(
      feat => feat["name"] === "dashboard"
    );
    console.log(selectedBranch);
    this.state = {
      selectedBranch: selectedBranch[0]
    };
  }

  render() {
    return (
      <Grid item md={6} sm={12} lg={6} xm={12} className="background">
        <Grid>Branch location</Grid>
        <TodoList branch={this.state.selectedBranch} />
        {/* <Row>
          <Col className="todo-list">
            <TodoList branch={this.state.selectedBranch} />
          </Col>
        </Row> */}
        {/* Add this part after finishing top-half section
        <Row>
          <Col className="details">Details</Col>
        </Row> */}
      </Grid>
    );
  }
}

export default BranchPanel;
