import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import EditTaskForm from "./EditTaskForm";

class TodoListTask extends Component {
  render() {
    {
      console.log(this.props.subtask);
    }
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h4>{this.props.subtask.name}</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="flexbox">
          <p className="flex-left">{this.props.subtask.name}</p>
          <div className="flex-right">
            <EditTaskForm />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default TodoListTask;
